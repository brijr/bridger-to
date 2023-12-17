import Grid from "@/components/grid";
import GridCol from "@/components/grid-col";
import IntroCol from "@/components/intro-col";
import ProjectCol from "@/components/projects-col";
import WorkCol from "@/components/work-col";
import OneGridCol from "@/components/one-grid-col";

export default function Home() {
  return (
    <Grid>
      <OneGridCol>
        <IntroCol />
      </OneGridCol>
      <GridCol>
        <WorkCol />
      </GridCol>
      <GridCol>
        <ProjectCol />
      </GridCol>
    </Grid>
  );
}
