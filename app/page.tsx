import Grid from "@/components/grid";
import GridCol from "@/components/grid-col";
import IntroCol from "@/components/intro-col";
import WorkCol from "@/components/work-col";

export default function Home() {
  return (
    <Grid>
      <GridCol>
        <IntroCol />
      </GridCol>
      <GridCol>
        <WorkCol />
      </GridCol>
      <GridCol>
        <p>Hello World</p>
      </GridCol>
      <GridCol>
        <p>Hello World</p>
      </GridCol>
    </Grid>
  );
}
