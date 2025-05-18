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

	return (
		<>
			<div>
				<p style={{ fontSize: "0.5em" }}>A</p>
				<Slider
					defaultValue={[100]}
					min={50}
					max={300}
					step={10}
					value={value}
					onValueChange={handleValueChange}
				/>
				<p style={{ fontSize: "3em" }}>A</p>
			</div>
		</>
	)
}
