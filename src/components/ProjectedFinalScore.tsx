type ProjectedFinalScoreProps = {
  homeScore?: number;
  awayScore?: number;
};

export default function ProjectedFinalScore({
  homeScore = 119,
  awayScore = 107,
}: ProjectedFinalScoreProps) {
  return (
    <div className="jamProjectedScoreWrap">
      <div className="jamProjectedScoreBar">
        <div className="jamProjectedScoreSide jamProjectedScoreSideLeft">
          <div className="jamProjectedScoreStrip jamProjectedScoreStripBlue" />
          <div className="jamProjectedScoreNumber jamProjectedScoreNumberLeft">
            {homeScore}
          </div>
        </div>

        <div className="jamProjectedScoreTitle">
          PROJECTED SCORE
        </div>

        <div className="jamProjectedScoreSide jamProjectedScoreSideRight">
          <div className="jamProjectedScoreStrip jamProjectedScoreStripRed" />
          <div className="jamProjectedScoreNumber jamProjectedScoreNumberRight">
            {awayScore}
          </div>
        </div>
      </div>
    </div>
  );
}