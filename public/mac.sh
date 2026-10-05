#!/usr/bin/env bash
#
# Bridger's Mac setup. Mirrors https://bridger.to/mac
#
#   curl -fsSL https://bridger.to/mac.sh | bash
#   curl -fsSL https://bridger.to/mac.sh | bash -s -- --always-on
#   curl -fsSL https://bridger.to/mac.sh | bash -s -- --dry-run
#   GIT_NAME="Your Name" GIT_EMAIL=you@example.com bash -c "$(curl -fsSL https://bridger.to/mac.sh)"
#
# Flags:
#   --always-on   also configure never-sleep, SSH, screen sharing, firewall (uses sudo)
#   --no-agents   skip the terminal coding agents
#   --no-apps     skip GUI apps (casks)
#   --dry-run     print what would run, change nothing
#
# Safe to re-run. Anything already installed is skipped (including apps you
# installed yourself, outside Homebrew), a failed step never stops the rest, and
# ~/.zshrc is only touched inside a marked block. Read it before you run it.

set -uo pipefail

# Everything lives in main() so bash reads the whole script before running any of it.
# Otherwise, under `curl | bash`, a command that reads stdin (brew does) eats the rest of the script.
main() {
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
    -h|--help) echo "Flags: --always-on --no-agents --no-apps --dry-run"; exit 0 ;;
    *) echo "Unknown flag: $arg" >&2; exit 1 ;;
  esac
done

if [[ "$(uname -s)" != "Darwin" ]]; then
  echo "This script is for macOS." >&2
  exit 1
fi

# --- pretty output ----------------------------------------------------------
if [[ -t 1 ]]; then
  BOLD=$'\033[1m'; DIM=$'\033[2m'; RED=$'\033[31m'; GREEN=$'\033[32m'
  YELLOW=$'\033[33m'; CYAN=$'\033[36m'; RESET=$'\033[0m'
else
  BOLD=""; DIM=""; RED=""; GREEN=""; YELLOW=""; CYAN=""; RESET=""
fi

LOG="${TMPDIR:-/tmp}/bridger-mac-setup.log"
: > "$LOG" 2>/dev/null || LOG=/dev/null

INSTALLED=0
SKIPPED=0
FAILED=()

section() { printf "\n%s%s %s%s\n" "$BOLD$CYAN" "$1" "$2" "$RESET"; }
ok()      { printf "  %s✓%s %s\n" "$GREEN" "$RESET" "$1"; }
skip()    { printf "  %s⏭%s  %s %s(already there)%s\n" "$YELLOW" "$RESET" "$1" "$DIM" "$RESET"; }
fail()    { printf "  %s✗%s %s %s(see %s)%s\n" "$RED" "$RESET" "$1" "$DIM" "$LOG" "$RESET"; }
note()    { printf "  %s%s%s\n" "$DIM" "$1" "$RESET"; }
dry()     { printf "  %s+%s %s\n" "$DIM" "$RESET" "$1"; }

have() { command -v "$1" >/dev/null 2>&1; }

# Run a command quietly, logging output. Never aborts the script.
# usage: step "label" cmd args...
step() {
  local label="$1"; shift
  if [[ $DRY_RUN -eq 1 ]]; then dry "$label"; return 0; fi
  printf "  %s…%s %s\r" "$DIM" "$RESET" "$label"
  if "$@" >>"$LOG" 2>&1 </dev/null; then
    printf "\033[2K"; ok "$label"; INSTALLED=$((INSTALLED + 1))
  else
    printf "\033[2K"; fail "$label"; FAILED+=("$label")
  fi
}

# Same, for a shell snippet (curl | bash installers).
step_sh() {
  local label="$1" snippet="$2"
  step "$label" bash -c "$snippet"
}

mark_skipped() { skip "$1"; SKIPPED=$((SKIPPED + 1)); }

brew_formula() {
  local f
  for f in "$@"; do
    if [[ $DRY_RUN -eq 0 ]] && brew list --formula "$f" >/dev/null 2>&1 </dev/null; then
      mark_skipped "$f"
    else
      step "$f" brew install "$f"
    fi
  done
}

# Casks: skip if brew has it, or if an app with a matching name is already in /Applications.
brew_cask() {
  local c app
  for c in "$@"; do
    if [[ $DRY_RUN -eq 1 ]]; then dry "$c"; continue; fi
    if brew list --cask "$c" >/dev/null 2>&1 </dev/null; then mark_skipped "$c"; continue; fi
    # Ask brew which .app the cask installs, then see if it is already on disk.
    app=$(brew info --cask "$c" 2>/dev/null </dev/null | grep -oE '[^/]+\.app' | head -1)
    if [[ -n "$app" && ( -d "/Applications/$app" || -d "$HOME/Applications/$app" ) ]]; then
      mark_skipped "$c ($app)"; continue
    fi
    # Last resort: if brew says an app is already in the way, that counts as installed.
    local out
    out=$(brew install --cask "$c" 2>&1 </dev/null); local rc=$?
    printf "%s\n" "$out" >>"$LOG"
    if [[ $rc -eq 0 ]]; then ok "$c"; INSTALLED=$((INSTALLED + 1))
    elif grep -q "already an App" <<<"$out"; then mark_skipped "$c"
    else fail "$c"; FAILED+=("$c"); fi
  done
}

# ---------------------------------------------------------------------------
cat <<EOF
${BOLD}
   ╭──────────────────────────────────────╮
   │   🛠  Bridger's Mac setup             │
   │   bridger.to/mac                     │
   ╰──────────────────────────────────────╯${RESET}
${DIM}Already-installed things get skipped. Nothing here stops on an error.
Full log: ${LOG}${RESET}
EOF
[[ $DRY_RUN -eq 1 ]] && printf "\n%s🧪 Dry run: nothing will be changed.%s\n" "$YELLOW" "$RESET"

# Some apps (Teams, Zoom, WARP) ship pkg installers that need your password.
# Ask once up front and keep it alive, instead of failing halfway through.
if [[ $DRY_RUN -eq 0 && $APPS -eq 1 ]]; then
  if sudo -v </dev/tty 2>>"$LOG"; then
    ( while true; do sudo -n true 2>/dev/null; sleep 50; kill -0 "$$" 2>/dev/null || exit; done ) &
    SUDO_KEEPALIVE=$!
    trap 'kill "$SUDO_KEEPALIVE" 2>/dev/null' EXIT
  else
    note "No password entered. Apps with pkg installers (Teams, Zoom, WARP) may fail; re-run to retry."
  fi
fi

# ---------------------------------------------------------------------------
section "🔨" "Xcode Command Line Tools"
if xcode-select -p >/dev/null 2>&1; then
  mark_skipped "Command Line Tools"
elif [[ $DRY_RUN -eq 1 ]]; then
  dry "xcode-select --install"
else
  xcode-select --install >>"$LOG" 2>&1
  note "A dialog just opened. Finish it, then run this script again."
  exit 0
fi

# ---------------------------------------------------------------------------
section "🍺" "Homebrew"
if have brew || [[ -x /opt/homebrew/bin/brew ]]; then
  mark_skipped "Homebrew"
else
  step_sh "Homebrew" 'NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'
fi
if [[ -x /opt/homebrew/bin/brew ]]; then
  eval "$(/opt/homebrew/bin/brew shellenv)"
  if [[ $DRY_RUN -eq 0 ]] && ! grep -qs 'brew shellenv' "$HOME/.zprofile" 2>/dev/null; then
    echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> "$HOME/.zprofile"
  fi
fi
if [[ $DRY_RUN -eq 0 ]] && ! have brew; then
  printf "  %s✗%s Homebrew isn't available, so I can't install the rest. Check %s\n" "$RED" "$RESET" "$LOG"
  exit 1
fi

# ---------------------------------------------------------------------------
section "⚙️ " "Developer tooling"
brew_formula gh ripgrep fzf zoxide btop tmux herdr ffmpeg neovim node nvm cloudflared
if have stripe; then mark_skipped "stripe"; else step "stripe" brew install stripe/stripe-cli/stripe; fi

# ---------------------------------------------------------------------------
if [[ $APPS -eq 1 ]]; then
  section "🖥 " "System apps"
  brew_cask ghostty raycast google-chrome cleanshot 1password logi-options+

  section "✍️ " "Editors"
  brew_cask cursor zed

  section "🐳" "Infrastructure, data & Python"
  brew_cask orbstack tableplus miniconda

  section "🤖" "Desktop AI apps"
  brew_cask claude chatgpt grok-bot

  section "💬" "Messaging"
  brew_cask slack discord microsoft-teams zoom

  section "🎨" "Productivity & design"
  brew_cask notion notion-calendar figma

  section "☁️ " "Cloudflare"
  brew_cask cloudflare-warp
fi

# ---------------------------------------------------------------------------
section "📦" "pnpm, Bun & global CLIs"
if have pnpm || [[ -x "$HOME/Library/pnpm/pnpm" ]]; then mark_skipped "pnpm"; else step_sh "pnpm" 'curl -fsSL https://get.pnpm.io/install.sh | sh -'; fi
if have bun  || [[ -x "$HOME/.bun/bin/bun" ]];        then mark_skipped "bun";  else step_sh "bun"  'curl -fsSL https://bun.sh/install | bash'; fi
[[ $DRY_RUN -eq 0 ]] && mkdir -p "$HOME/.nvm"

for cli in vercel wrangler; do
  if have "$cli"; then
    mark_skipped "$cli"
  elif have npm; then
    step "$cli" npm i -g "$cli"
  elif [[ $DRY_RUN -eq 1 ]]; then
    dry "npm i -g $cli"
  else
    note "npm isn't on PATH yet. Open a new terminal and run: npm i -g $cli"
  fi
done

# ---------------------------------------------------------------------------
section "🐚" "Oh My Zsh"
if [[ -d "$HOME/.oh-my-zsh" ]]; then
  mark_skipped "Oh My Zsh"
else
  step_sh "Oh My Zsh" 'RUNZSH=no CHSH=no KEEP_ZSHRC=yes sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"'
fi
ZSH_CUSTOM_DIR="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
for plugin in zsh-autosuggestions zsh-syntax-highlighting; do
  if [[ -d "$ZSH_CUSTOM_DIR/plugins/$plugin" ]]; then
    mark_skipped "$plugin"
  else
    step "$plugin" git clone "https://github.com/zsh-users/$plugin" "$ZSH_CUSTOM_DIR/plugins/$plugin"
  fi
done

# ---------------------------------------------------------------------------
section "📝" "Neovim (kickstart)"
NVIM_DIR="${XDG_CONFIG_HOME:-$HOME/.config}/nvim"
if [[ -d "$NVIM_DIR" ]]; then
  mark_skipped "nvim config (left alone)"
else
  step "kickstart.nvim" git clone https://github.com/nvim-lua/kickstart.nvim.git "$NVIM_DIR"
fi

# ---------------------------------------------------------------------------
if [[ $AGENTS -eq 1 ]]; then
  section "🧠" "Terminal coding agents"
  agent() { # name, command to check, installer
    if have "$2" || [[ -x "$HOME/.$2/bin/$2" ]]; then mark_skipped "$1"; else step_sh "$1" "$3"; fi
  }
  agent "Claude Code" claude   'curl -fsSL https://claude.ai/install.sh | bash'
  agent "Codex"       codex    'curl -fsSL https://chatgpt.com/codex/install.sh | sh'
  agent "OpenCode"    opencode 'curl -fsSL https://opencode.ai/v2/install | bash'
  agent "Grok CLI"    grok     'curl -fsSL https://x.ai/cli/install.sh | bash'
  agent "Pi"          pi       'curl -fsSL https://pi.dev/install.sh | sh'
  agent "Muse"        muse     'curl https://dev.meta.ai/install.sh | bash'
fi

# Claude Code settings: only written when missing, so an existing config is never touched
CLAUDE_SETTINGS="$HOME/.claude/settings.json"
if [[ $AGENTS -eq 1 ]]; then
  if [[ $DRY_RUN -eq 1 ]]; then
    dry "write Claude Code settings if missing"
  elif [[ -f "$CLAUDE_SETTINGS" ]]; then
    mark_skipped "Claude Code settings"
  else
    mkdir -p "$(dirname "$CLAUDE_SETTINGS")"
    cat > "$CLAUDE_SETTINGS" <<'EOF'
{
  "model": "sonnet",
  "tui": "fullscreen",
  "theme": "dark",
  "agentPushNotifEnabled": true
}
EOF
    [[ $? -eq 0 ]] && ok "Claude Code settings" && INSTALLED=$((INSTALLED + 1))
  fi
fi

# ---------------------------------------------------------------------------
section "🌿" "Git config"
step "alias: git send" git config --global alias.send '!f() { git add . && git commit -m "${1:-wip}"; }; f'
step "default branch: main" git config --global init.defaultBranch main
step "GitHub credentials via gh" bash -c "git config --global --replace-all credential.https://github.com.helper '' && git config --global --add credential.https://github.com.helper '!/opt/homebrew/bin/gh auth git-credential'"
# Identity: keep what's already set, else use GIT_NAME / GIT_EMAIL, else ask.
for kv in "name:GIT_NAME:Your name" "email:GIT_EMAIL:Your email"; do
  key="${kv%%:*}"; rest="${kv#*:}"; var="${rest%%:*}"; prompt="${rest#*:}"
  current=$(git config --global "user.$key" 2>/dev/null || true)
  if [[ -n "$current" ]]; then
    mark_skipped "user.$key ($current)"
  elif [[ $DRY_RUN -eq 1 ]]; then
    dry "set user.$key from \$$var or a prompt"
  else
    value="${!var:-}"
    if [[ -z "$value" ]] && { : </dev/tty; } 2>/dev/null; then
      printf "  %s? %s:%s " "$CYAN" "$prompt" "$RESET" >/dev/tty
      read -r value </dev/tty || value=""
    fi
    if [[ -n "$value" ]]; then
      step "user.$key" git config --global "user.$key" "$value"
    else
      note "Skipped user.$key. Set it later: git config --global user.$key \"...\""
    fi
  fi
done

# ---------------------------------------------------------------------------
section "🧩" "Shell config"
ZSHRC="$HOME/.zshrc"
BEGIN="# >>> bridger.to mac setup >>>"

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
  dry "append the marked block to $ZSHRC and enable the zsh plugins"
elif grep -qsF "$BEGIN" "$ZSHRC"; then
  mark_skipped "~/.zshrc block"
else
  [[ -f "$ZSHRC" ]] && cp "$ZSHRC" "$ZSHRC.bak.$(date +%s)"
  if grep -qs '^plugins=' "$ZSHRC"; then
    sed -i '' 's/^plugins=.*/plugins=(git zsh-autosuggestions zsh-syntax-highlighting)/' "$ZSHRC"
  fi
  printf "\n%s\n" "$ZSHRC_BLOCK" >> "$ZSHRC" && ok "~/.zshrc (backup saved next to it)" && INSTALLED=$((INSTALLED + 1))
fi

# Ghostty reads both of these. Only written when missing, so your own config is never overwritten.
GHOSTTY_DIR="$HOME/Library/Application Support/com.mitchellh.ghostty"
GHOSTTY_LOOK="$GHOSTTY_DIR/config.ghostty"
GHOSTTY_SHELL="$HOME/.config/ghostty/config"
if [[ $DRY_RUN -eq 1 ]]; then
  dry "write Ghostty config (font, theme, keybinds, quick terminal) if missing"
else
  if [[ -f "$GHOSTTY_LOOK" ]]; then
    mark_skipped "Ghostty config"
  else
    mkdir -p "$GHOSTTY_DIR"
    cat > "$GHOSTTY_LOOK" <<'EOF'
font-family=Menlo
theme=Flexoki Dark
font-size=14
window-padding-balance=true
window-padding-x=8
window-padding-y=8

keybind = cmd+left=goto_split:left
keybind = cmd+down=goto_split:down
keybind = cmd+up=goto_split:up
keybind = cmd+right=goto_split:right
keybind = cmd+k=unbind
keybind = global:cmd+grave_accent=toggle_quick_terminal

quick-terminal-position = right
EOF
    [[ $? -eq 0 ]] && ok "Ghostty config (font, theme, keybinds)" && INSTALLED=$((INSTALLED + 1))
  fi
  if [[ -f "$GHOSTTY_SHELL" ]]; then
    mark_skipped "Ghostty shell integration config"
  else
    mkdir -p "$(dirname "$GHOSTTY_SHELL")"
    printf 'shell-integration = none\nshell-integration-features = cursor,title,path\n' > "$GHOSTTY_SHELL" \
      && ok "Ghostty shell integration config" && INSTALLED=$((INSTALLED + 1))
  fi
fi

# Zed: only written when missing
ZED_CONFIG="$HOME/.config/zed/settings.json"
if [[ $DRY_RUN -eq 1 ]]; then
  dry "write Zed settings if missing"
elif [[ -f "$ZED_CONFIG" ]]; then
  mark_skipped "Zed settings"
else
  mkdir -p "$(dirname "$ZED_CONFIG")"
  cat > "$ZED_CONFIG" <<'EOF'
{
  "buffer_font_family": "Menlo",
  "buffer_font_size": 13,
  "autosave": "on_focus_change",
  "format_on_save": "on",
  "soft_wrap": "editor_width",
  "tab_size": 2,
  "theme": "Flexoki Dark",
  "auto_install_extensions": { "flexoki": true },
  "terminal": { "font_family": "Menlo" },
  "telemetry": { "diagnostics": false, "metrics": false },
  "git": { "inline_blame": { "enabled": false } },
  "minimap": { "show": "never" },
  "agent": { "dock": "right", "default_profile": "write" },
  "project_panel": { "dock": "left" }
}
EOF
  [[ $? -eq 0 ]] && ok "Zed settings" && INSTALLED=$((INSTALLED + 1))
fi

# ---------------------------------------------------------------------------
section "🎛 " "macOS defaults"
if [[ $DRY_RUN -eq 1 ]]; then
  dry "Finder, keyboard, and screenshot defaults"
else
  mkdir -p "$HOME/Desktop/Screenshots"
  {
    defaults write NSGlobalDomain AppleShowAllExtensions -bool true
    defaults write com.apple.finder FXPreferredViewStyle -string "clmv"
    defaults write com.apple.finder ShowPathbar -bool true
    defaults write NSGlobalDomain KeyRepeat -int 1
    defaults write NSGlobalDomain InitialKeyRepeat -int 10
    defaults write NSGlobalDomain NSAutomaticSpellingCorrectionEnabled -bool false
    defaults write NSGlobalDomain NSNavPanelExpandedStateForSaveMode -bool true
    defaults write NSGlobalDomain PMPrintingExpandedStateForPrint -bool true
    defaults -currentHost write com.apple.ImageCapture disableHotPlug -bool true
    defaults write com.apple.screencapture location "$HOME/Desktop/Screenshots"
    defaults write com.apple.screencapture type -string "png"
    defaults write com.apple.screencapture target -string "clipboard"
    defaults write com.apple.dock autohide -bool true
    defaults write com.apple.dock tilesize -int 49
    defaults write com.apple.dock orientation -string "left"
    defaults write com.apple.dock show-recents -bool false
  } >>"$LOG" 2>&1 && ok "Finder, Dock, keyboard & screenshots tuned" || { fail "macOS defaults"; FAILED+=("macOS defaults"); }
  killall Finder >>"$LOG" 2>&1 || true
  killall Dock >>"$LOG" 2>&1 || true
fi

# ---------------------------------------------------------------------------
if [[ $ALWAYS_ON -eq 1 ]]; then
  section "🌙" "Always-on Mac (needs sudo)"
  brew_cask tailscale-app
  if [[ $DRY_RUN -eq 0 ]]; then
    note "You may be asked for your password."
    sudo -v >>"$LOG" 2>&1 || note "sudo unavailable, the steps below will be reported as failed."
  fi
  step "never sleep, auto-restart" sudo pmset -a sleep 0 disksleep 0 autorestart 1 womp 1
  step "firewall on" bash -c 'sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setglobalstate on && sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsigned on && sudo /usr/libexec/ApplicationFirewall/socketfilterfw --setallowsignedapp on'
  step "remote login (SSH)" sudo systemsetup -setremotelogin on
  step "screen sharing" bash -c 'sudo launchctl enable system/com.apple.screensharing; sudo launchctl bootstrap system /System/Library/LaunchDaemons/com.apple.screensharing.plist 2>/dev/null || true'
  if [[ $DRY_RUN -eq 0 ]] && ! grep -qs 'alias tailscale=' "$HOME/.zshrc" 2>/dev/null; then
    echo 'alias tailscale="/Applications/Tailscale.app/Contents/MacOS/Tailscale"' >> "$HOME/.zshrc"
  fi
  note "Sign in to Tailscale, then run: tailscale set --ssh"
  note "FileVault is left on. Turn it off yourself only if you accept the trade-off."
fi

# ---------------------------------------------------------------------------
printf "\n%s🎉 All done!%s  %s%d installed or configured, %d already there%s\n" \
  "$BOLD$GREEN" "$RESET" "$BOLD" "$INSTALLED" "$SKIPPED" "$RESET"

if [[ ${#FAILED[@]} -gt 0 ]]; then
  printf "\n%sA few things didn't work. Re-run the script to retry, or check %s:%s\n" "$YELLOW" "$LOG" "$RESET"
  for f in "${FAILED[@]}"; do printf "  %s•%s %s\n" "$RED" "$RESET" "$f"; done
fi

cat <<EOF

${BOLD}Next steps${RESET}
  1. Open a new terminal ${DIM}(or: source ~/.zshrc)${RESET}
  2. gh auth login
  3. vercel login && wrangler login
  4. claude ${DIM}(sign in)${RESET}
  5. Turn on Time Machine ${DIM}(System Settings → General → Time Machine)${RESET}

Happy building. 🚀
EOF
}

main "$@"
