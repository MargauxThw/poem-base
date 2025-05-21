import { Slider } from "@/components/ui/slider"
import { useState } from "react"

type FontSizeSliderProps = {
	currentFontSize: number
	updateFontSize: (index: number) => void
}

export default function FontSizeSlider({
	currentFontSize,
	updateFontSize
}: FontSizeSliderProps) {
	const [value, setValue] = useState<number[]>([currentFontSize])

    function handleValueChange(newValue: number[]) {
        setValue(newValue)
        updateFontSize(newValue[0])
    }

	// TODO: Make each side of the slider a button that changes the value by 10 (also same size so nice balance)

	return (
		<>
			<div className="flex flex-row items-center gap-2">
				<p style={{ fontSize: "0.5em", width: "36px", textAlign: "left" }}>A</p>

				<Slider
					defaultValue={[100]}
					min={50}
					max={300}
					step={10}
					value={value}
					onValueChange={handleValueChange}
					className="flex-grow"
				/>
				<p style={{ fontSize: "3em", width: "36px", textAlign: "right" }}>A</p>
			</div>
		</>
	)
}
