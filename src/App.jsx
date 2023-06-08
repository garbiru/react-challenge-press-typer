import { useCallback, useEffect, useState } from "react";

function App() {
	const [letters, setLetters] = useState({
		letters: [
			{
				letter: "A",
				id: 0,
			},
			{
				letter: "B",
				id: 1,
			},
			{
				letter: "C",
				id: 2,
			},
		],
		selectedLetterId: null,
	});

	const handleKeyDown = useCallback(
		(e) => {
			if (letters.selectedLetterId === null) return;

			const charCode = e.keyCode;

			if (
				(charCode > 64 && charCode < 91) ||
				(charCode > 96 && charCode < 123) ||
				charCode == 8
			) {
				const letterIndex = letters.letters.findIndex((letter) => {
					return letter.id === letters.selectedLetterId;
				});

				const newLetters = [...letters.letters];
				newLetters[letterIndex].letter = e.key.toUpperCase();

				setLetters({ letters: newLetters, selectedLetterId: null });
			}
		},
		[letters]
	);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [handleKeyDown]);

	const handleChangeLetter = (letterId) => {
		if (letterId === letters.selectedLetterId) return;

		setLetters((prev) => ({
			...prev,
			selectedLetterId: letterId,
		}));
	};

	const handleAddLetter = (idx) => {
		setLetters((prev) => {
			let newLetters = [...prev.letters];

			newLetters.splice(idx + 1, 0, {
				letter: "",
				id: prev.letters.length,
			});

			return {
				letters: newLetters,
				selectedLetterId: prev.letters.length,
			};
		});
	};

	console.log("tou correno");

	return (
		<main>
			<div className="w-screen h-screen flex justify-center items-center">
				<div className="flex gap-3">
					{letters.letters.map((letter, idx) => {
						return (
							<div
								key={letter.id}
								className="w-24 h-24 relative flex justify-center items-center text-3xl border border-white rounded-md shadow"
								onClick={() => handleChangeLetter(letter.id)}
							>
								<span
									// className={
									// 	idx < letters.letters.length - 1
									// 		? `translate-x-5`
									// 		: ""
									// }
								>
									{letter.letter}
								</span>
								{idx < letters.letters.length - 1 && (
									<span
										onClick={(e) => {
											e.stopPropagation();
											handleAddLetter(idx);
										}}
										className="w-10 h-full flex justify-center items-center absolute left-0 top-0 translate-x-20 cursor-pointer z-50"
									></span>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</main>
	);
}

export default App;
