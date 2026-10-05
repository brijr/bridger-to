#!/usr/bin/env bash
#
# Bridger's Mac setup. Mirrors https://bridger.to/posts/mac
#
#   curl -fsSL https://bridger.to/mac.sh | bash
#   curl -fsSL https://bridger.to/mac.sh | bash -s -- --always-on
#   curl -fsSL https://bridger.to/mac.sh | bash -s -- --dry-run
#
# Flags:
#   --always-on   also configure never-sleep, SSH, screen sharing, firewall (uses sudo)
#   --no-agents   skip the terminal coding agents
#   --no-apps     skip GUI apps (casks)
#   --dry-run     print what would run, change nothing
#
# Safe to re-run: installs are skipped when already present, and ~/.zshrc is only
# touched inside a marked block. Read it before you run it.

set -uo pipefail

ALWAYS_ON=0
AGENTS=1
APPS=1
DRY_RUN=0

for arg in "$@"; do
  case "$arg" in
    --always-on) ALWAYS_ON=1 ;;
    --no-agents) AGENTS=0 ;;
    --no-apps) APPS=0 ;;
    --dry-run) DRY_RUN=1 ;;
    -h|--help) sed -n '2,17p' "$0" 2>/dev/null; exit 0 ;;
    *) echo "Unknown flag: $arg" >&2; exit 1 ;;
  esac
done

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This script is for macOS." >&2
  exit 1
fi

FAILED=()

say() { printf "\n\033[1m==> %s\033[0m\n" "$1"; }

# Run a command, or just print it in dry-run mode. Failures are collected, not fatal.
run() {
  if [[ $DRY_RUN -eq 1 ]]; then
    printf "  + %s\n" "$*"
    return 0
  fi
  "$@" || FAILED+=("$*")
}

# Run a shell snippet (needed for curl | bash installers).
run_sh() {
  if [[ $DRY_RUN -eq 1 ]]; then
    printf "  + %s\n" "$1"
    return 0
  fi
  bash -c "$1" || FAILED+=("$1")
}

have() { command -v "$1" >/dev/null 2>&1; }

brew_formula() {
  for f in "$@"; do
    if [[ $DRY_RUN -eq 0 ]] && brew list --formula "$f" >/dev/null 2>&1; then
      echo "  already installed: $f"
    else
      run brew install "$f"
    fi
  done
}

brew_cask() {
  for c in "$@"; do
    if [[ $DRY_RUN -eq 0 ]] && brew list --cask "$c" >/dev/null 2>&1; then
      echo "  already installed: $c"
    else
      run brew install --cask "$c"
    fi
  done
}

# ---------------------------------------------------------------------------
say "Xcode Command Line Tools"
if ! xcode-select -p >/dev/null 2>&1; then
  run xcode-select --install
  echo "  Finish the installer dialog, then re-run this script."
  [[ $DRY_RUN -eq 0 ]] && exit 0
fi

# ---------------------------------------------------------------------------
say "Homebrew"
if ! have brew && [[ ! -x /opt/homebrew/bin/brew ]]; then
  run_sh 'NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
fi
if [[ -x /opt/homebrew/bin/brew ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
  if ! grep -qs 'brew shellenv' "$HOME/.zprofile" 2>/dev/null; then
    [[ $DRY_RUN -eq 0 ]] && echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> "$HOME/.zprofile"
  fi
fi
if [[ $DRY_RUN -eq 0 ]] && ! have brew; then
  echo "Homebrew is not on PATH, cannot continue." >&2
  exit 1
fi

# ---------------------------------------------------------------------------
say "Developer tooling"
brew_formula gh ripgrep fzf zoxide btop tmux herdr ffmpeg neovim node nvm cloudflared
run brew install stripe/stripe-cli/stripe

# ---------------------------------------------------------------------------
if [[ $APPS -eq 1 ]]; then
  say "System apps"
  brew_cask ghostty raycast google-chrome cleanshot 1password logi-options+

  say "Editors"
  brew_cask cursor zed

  say "Infrastructure, data & Python"
  brew_cask orbstack tableplus miniconda

  say "Desktop AI apps"
  brew_cask claude chatgpt grok-bot

  say "Messaging"
  brew_cask slack discord microsoft-teams zoom

  say "Productivity & design"
  brew_cask notion notion-calendar figma

  say "Cloudflare"
  brew_cask cloudflare-warp
fi

# ---------------------------------------------------------------------------
say "pnpm and Bun"
if ! have pnpm; then run_sh 'curl -fsSL https://get.pnpm.io/install.sh | sh -'; fi
if ! have bun;  then run_sh 'curl -fsSL https://bun.sh/install | bash'; fi

say "Global npm CLIs (Vercel, Wrangler)"
if have npm; then
  run npm i -g vercel wrangler
else
  echo "  npm not found yet, open a new shell and run: npm i -g vercel wrangler"
fi

mkdir -p "$HOME/.nvm"

# ---------------------------------------------------------------------------
say "Oh My Zsh"
if [[ ! -d "$HOME/.oh-my-zsh" ]]; then
  run_sh 'RUNZSH=no CHSH=no KEEP_ZSHRC=yes sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"'
fi
ZSH_CUSTOM_DIR="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
for plugin in zsh-autosuggestions zsh-syntax-highlighting; do
  if [[ ! -d "$ZSH_CUSTOM_DIR/plugins/$plugin" ]]; then
    run git clone "https://github.com/zsh-users/$plugin" "$ZSH_CUSTOM_DIR/plugins/$plugin"
  fi
done

# ---------------------------------------------------------------------------
say "Neovim (kickstart)"
NVIM_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/nvim"
if [[ ! -d "$NVIM_DIR" ]]; then
  run git clone https://github.com/nvim-lua/kickstart.nvim.git "$NVIM_DIR"
else
  echo "  $NVIM_DIR already exists, leaving it alone"
fi

# ---------------------------------------------------------------------------
if [[ $AGENTS -eq 1 ]]; then
  say "Terminal coding agents"
  have claude   || run_sh 'curl -fsSL https://claude.ai/install.sh | bash'
  have codex    || run_sh 'curl -fsSL https://chatgpt.com/codex/install.sh | sh'
  have opencode || [[ -x "$HOME/.opencode/bin/opencode" ]] || run_sh 'curl -fsSL https://opencode.ai/v2/install | bash'
  have grok     || [[ -x "$HOME/.grok/bin/grok" ]] || run_sh 'curl -fsSL https://x.ai/cli/install.sh | bash'
  have pi       || run_sh 'curl -fsSL https://pi.dev/install.sh | sh'
  have muse     || run_sh 'curl https://dev.meta.ai/install.sh | bash'
fi

# ---------------------------------------------------------------------------
say "Git config"
run git config --global alias.send '!f() { git add . && git commit -m "${1:-wip}"; }; f'
run git config --global init.defaultBranch main
run git config --global --replace-all credential.https://github.com.helper ''
run git config --global --add credential.https://github.com.helper '!/opt/homebrew/bin/gh auth git-credential'
echo "  Not setting user.name / user.email, set your own:"
echo "    git config --global user.name  \"Your Name\""
echo "    git config --global user.email \"you@example.com\""

# ---------------------------------------------------------------------------
say "~/.zshrc"
ZSHRC="$HOME/.zshrc"
BEGIN="# >>> bridger.to mac setup >>>"
END="# <<< bridger.to mac setup <<<"

ZSHRC_BLOCK=$(cat <<'EOF'
# >>> bridger.to mac setup >>>
export PATH="$HOME/.local/bin:$PATH"

# nvm
export NVM_DIR="$HOME/.nvm"
[ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && \. "/opt/homebrew/opt/nvm/nvm.sh"
[ -s "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm" ] && \. "/opt/homebrew/opt/nvm/etc/bash_completion.d/nvm"

eval "$(zoxide init zsh)"

# pnpm
alias p='pnpm'
alias pb='pnpm build'
alias pd='pnpm dev'

# Bun
alias b='bun'
alias bi='bun install'
alias bd='bun dev'
alias bu='bun update'
alias bb='bun run build'

# Git
alias gs='git send'
alias gp='git push'

# Claude Code, no interruptions. Skips every permission prompt, use on throwaway repos only.
alias lfg='claude --dangerously-skip-permissions'

# Ghostty shell integration
if [[ -n $GHOSTTY_RESOURCES_DIR && -f $GHOSTTY_RESOURCES_DIR/shell-integration/zsh/ghostty-integration ]]; then
  source "$GHOSTTY_RESOURCES_DIR/shell-integration/zsh/ghostty-integration"
fi
# <<< bridger.to mac setup <<<
EOF
)

if [[ $DRY_RUN -eq 1 ]]; then
  echo "  + would append the marked block to $ZSHRC and set plugins=(git zsh-autosuggestions zsh-syntax-highlighting)"
elif grep -qsF "$BEGIN" "$ZSHRC"; then
  echo "  block already present in $ZSHRC"
else
  [[ -f "$ZSHRC" ]] && cp "$ZSHRC" "$ZSHRC.bak.$(date +%s)"
  # Enable the plugins in an existing Oh My Zsh config.
  if grep -qs '^plugins=' "$ZSHRC"; then
    sed -i '' 's/^plugins=.*/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/' "$ZSHRC"
  fi
  printf "\n%s\n" "$ZSHRC_BLOCK" >> "$ZSHRC"
  echo "  appended block to $ZSHRC (backup saved next to it)"
fi

# Ghostty
GHOSTTY_CONFIG="$HOME/.config/ghostty/config"
if [[ $DRY_RUN -eq 1 ]]; then
  echo "  + would write $GHOSTTY_CONFIG if missing"
elif [[ ! -f "$GHOSTTY_CONFIG" ]]; then
  mkdir -p "$(dirname "$GHOSTTY_CONFIG")"
  cat > "$GHOSTTY_CONFIG" <<'EOF'
shell-integration = none
shell-integration-features = cursor,title,path
EOF
fi

# ---------------------------------------------------------------------------
say "macOS defaults"
run mkdir -p "$HOME/Desktop/Screenshots"
run defaults write NSGlobalDomain AppleShowAllExtensions -bool true
run defaults write com.apple.finder FXPreferredViewStyle -string "clmv"
run defaults write com.apple.finder ShowPathbar -bool true
run defaults write NSGlobalDomain KeyRepeat -int 1
run defaults write NSGlobalDomain InitialKeyRepeat -int 10
run defaults write NSGlobalDomain NSAutomaticSpellingCorrectionEnabled -bool false
run defaults write NSGlobalDomain NSNavPanelExpandedStateForSaveMode -bool true
run defaults write NSGlobalDomain PMPrintingExpandedStateForPrint -bool true
run defaults -currentHost write com.apple.ImageCapture disableHotPlug -bool true
run defaults write com.apple.screencapture location "$HOME/Desktop/Screenshots"
run defaults write com.apple.screencapture type -string "png"
run defaults write com.apple.screencapture target -string "clipboard"
run killall Finder

# ---------------------------------------------------------------------------
if [[ $ALWAYS_ON -eq 1 ]]; then
  say "Always-on Mac (sudo)"
  brew_cask tailscale-app
  run sudo pmset -a sleep 0 disksleep 0 autorestart 1 womp 1
  run sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on
  run sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsigned on
  run sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsignedapp on
  run sudo systemsetup -setremotelogin on
  run sudo launchctl enable system/com.apple.screensharing
  run sudo launchctl bootstrap system /System/Library/LaunchDaemons/com.apple.screensharing.plist
  if ! grep -qs 'alias tailscale=' "$HOME/.zshrc" 2>/dev/null && [[ $DRY_RUN -eq 0 ]]; then
    echo 'alias tailscale="/Applications/Tailscale.app/Contents/MacOS/Tailscale"' >> "$HOME/.zshrc"
  fi
  echo "  Then sign in to Tailscale and run: tailscale set --ssh"
  echo "  FileVault is left on. Turn it off yourself only if you accept the trade-off."
fi

# ---------------------------------------------------------------------------
say "Done"
if [[ ${#FAILED[@]} -gt 0 ]]; then
  echo "These steps failed:"
  for f in "${FAILED[@]}"; do echo "  - $f"; done
fi
cat <<'EOF'

Next steps:
  1. Open a new terminal (or: source ~/.zshrc)
  2. gh auth login
  3. vercel login && wrangler login
  4. claude   (sign in)
  5. Set git user.name and user.email
  6. Turn on Time Machine: System Settings -> General -> Time Machine
EOF
