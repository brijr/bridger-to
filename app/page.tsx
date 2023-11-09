import Grid from "@/components/grid";
import GridCol from "@/components/grid-col";
import IntroCol from "@/components/intro-col";
import ProjectCol from "@/components/projects-col";
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
        <ProjectCol />
      </GridCol>
      <GridCol>
        <p>Hello World</p>
      </GridCol>
    </Grid>
  );
}
