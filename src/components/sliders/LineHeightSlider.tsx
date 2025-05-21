import { Slider } from "@/components/ui/slider"
import { useState } from "react"

type LineHeightSliderProps = {
	currentLineHeight: number
	updateLineHeight: (index: number) => void
}

export default function LineHeightSlider({
	currentLineHeight,
	updateLineHeight
}: LineHeightSliderProps) {
	const [value, setValue] = useState<number[]>([currentLineHeight])

	function handleValueChange(newValue: number[]) {
		setValue(newValue)
		updateLineHeight(newValue[0])
	}

	return (
		<>
			<div className='flex flex-row space-between gap-2'>
				<p style={{ fontSize: "1.5em", width: "36px", textAlign: "left" }}>||</p>
				<Slider
					defaultValue={[1.5]}
					min={1}
					max={3}
					step={0.1}
					value={value}
					onValueChange={handleValueChange}
					className="flex-grow"
				/>
				<p style={{ fontSize: "1.5em", width: "36px", textAlign: "right" }}>| |</p>
			</div>
		</>
	)
}
