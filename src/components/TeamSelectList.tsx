interface Props {
  label: string
  teams: any[]
  selectedTeam: string | null
  cursorIndex: number
  forbiddenTeam: string | null
  isFocused: boolean
  onSelect: (teamId: string) => void
}

export default function TeamSelectList({
  label,
  teams,
  selectedTeam,
  cursorIndex,
  forbiddenTeam,
  isFocused,
  onSelect
}: Props) {
  return (
    <div className={`jamFrame ${isFocused ? "isFocused" : ""}`}>
      <div className="jamFrameInner">
        <div className="jamHeader">
          <span className="jamHeaderText">{label}</span>
        </div>

        <ul className="jamList" role="listbox" aria-label={label}>
          {teams.map((team, idx) => {
            const isSelected = team.id === selectedTeam
            const isForbidden = team.id === forbiddenTeam
            const isCursor = idx === cursorIndex

            return (
              <li
                key={team.id}
                className={[
                  "jamItem",
                  isCursor && isFocused ? "isCursor" : "",
                  isSelected ? "isSelected" : "",
                  isForbidden ? "isForbidden" : ""
                ].join(" ")}
                aria-selected={isSelected}
                onClick={() => !isForbidden && onSelect(team.id)}
              >
                {/* Cursor arrow (only when focused + cursor row) */}
                <span className="jamCursor" aria-hidden="true">
                  ▶
                </span>

                <span className="jamName">{team.displayName}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}