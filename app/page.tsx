import Grid from "@/components/grid";
import GridColumn from "@/components/grid-column";
import IntroColumn from "@/components/intro-column";

export default function Home() {
  return (
    <Grid>
      <GridColumn>
        <IntroColumn />
      </GridColumn>
      <GridColumn>
        <p>Hello World</p>
      </GridColumn>
      <GridColumn>
        <p>Hello World</p>
      </GridColumn>
      <GridColumn>
        <p>Hello World</p>
      </GridColumn>
    </Grid>
  );
}
