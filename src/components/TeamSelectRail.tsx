import React, { useRef, useEffect } from "react";

export default function TeamSelectRail({
  teams,
  cursorIndex,
  teamAId,
  teamBId,
  onCursorChange,
  onSelect,
}: any) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeItem = scrollRef.current?.querySelector(".isCursor");
    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [cursorIndex]);

  const scrollRail = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const amount = 440; // about 2 columns at a time
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  return (
    <div className="jamRailFrame">
      <div className="jamRailWrapper">
        <button
          type="button"
          className="jamRailArrow"
          onClick={() => scrollRail("left")}
          aria-label="Scroll teams left"
        >
          ◀
        </button>

        <div className="jamRailScrollContainer" ref={scrollRef}>
          <div className="jamColumnGrid">
            {teams.map((team: any, idx: number) => {
              const isCursor = idx === cursorIndex;
              const isA = team && team.id === teamAId;
              const isB = team && team.id === teamBId;

              let itemClass = "jamRailItem";
              if (isA) itemClass += " isSelectedA";
              if (isB) itemClass += " isSelectedB";
              if (isCursor) itemClass += " isCursor";
              if (!team) itemClass += " isEmptySlot";

              return (
                <button
                  key={team?.id || `empty-${idx}`}
                  className={itemClass}
                  tabIndex={-1}
                  onClick={() => team && onSelect(team.id)}
                  disabled={!team}
                >
                  <span className="jamCursorIcon">
                    {isCursor ? "▶" : ""}
                  </span>
                  {team ? team.displayName : ""}
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className="jamRailArrow"
          onClick={() => scrollRail("right")}
          aria-label="Scroll teams right"
        >
          ▶
        </button>
      </div>
    </div>
  );
}