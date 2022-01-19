import Head from 'next/head'
import { useEffect } from 'react';
import * as Magick from "wasm-imagemagick"

export default function Home() {
	const doMagick = async () => {
		const outputImage = document.getElementById('rotatedImage');
		const fetchedSourceImage = await fetch("rotate.png");
		const sourceBytes = new Uint8Array(await fetchedSourceImage.arrayBuffer());
		const inputFiles = [{ name: 'srcFile.png', content: sourceBytes }]
		let command = []
		try {
			command = JSON.parse((document.getElementById('input')).value)
		} catch (ex) {
			alert(ex)
		}
		const processedFiles = await Magick.Call(inputFiles, command);
		const firstOutputImage = processedFiles[0];
		outputImage.src = URL.createObjectURL(firstOutputImage["blob"]);
	}

	useEffect(() => {
		doMagick()
	}, [])

	return (
		<>
			<Head>
				<title>Next JS - New Worker syntax issue</title>
			</Head>
			<div>
				<textarea
					style={{ width: '100%', height: '100px' }}
					id="input"
					defaultValue='[ "convert", "srcFile.png", "-charcoal", "2", "out.png" ]'>
				</textarea>

				<p>
					<button onClick={doMagick}>do magick</button>
				</p>

				<p>Source image: </p>
				<img id="srcImage" src="https://y00u2.csb.app/rotate.png" />
				<p>Result: </p>
				<img id="rotatedImage" />
			</div>
		</>
	)
}
