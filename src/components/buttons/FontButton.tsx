import { FONT_OPTIONS } from "../../utils/staticData"

type FontButtonProps = {
	index: number
	currentFontIndex: number
	updateFont: (index: number) => void
}

export default function FontButton({
	index,
	currentFontIndex,
	updateFont
}: FontButtonProps) {
	function handleFontChange(newIndex: number) {
		updateFont(newIndex)
	}

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "0rem"
			}}
		>
			<button
				onClick={() => handleFontChange(index)}
				style={{
					border: "none",
					textDecorationLine:
						currentFontIndex === index ? "underline" : "none",
					color: currentFontIndex === index ? "#1E78BA" : "black",
					background: "transparent",
					cursor: "pointer",
					fontSize: "2rem",
					height: "64px",
					fontFamily: FONT_OPTIONS[index].value
				}}
			>
				Aa
			</button>
			<p
				style={{
					marginTop: "0",
					color: currentFontIndex === index ? "#1E78BA" : "black"
				}}
			>
				{FONT_OPTIONS[index].shortLabel}
			</p>
		</div>
	)
}
