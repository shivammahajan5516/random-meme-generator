//import { computeHeadingLevel } from '@testing-library/react'
import React, { useState, createRef } from 'react'
import { exportComponentAsJPEG } from 'react-component-export-image'

export default function Meme() {
    function getMemeImage() {
        const rand = Math.floor(Math.random() * allMeme.length)
        let url = allMeme[rand].url
        setMeme(prevMeme => {
            return {
                ...prevMeme,
                randomImage: url
            }
        })
    }
    //let [imgUrl, setImgurl] = useState("")
    let [Meme, setMeme] = useState({
        topText: "",
        bottomText: "",
        randomImage: "https://i.imgflip.com/1otk96.jpg"
    })
    let [allMeme, setallMeme] = useState([])
    function handleChange(event) {
        const { name, value } = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name]: value
        }))
    }
    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setallMeme(data.data.memes))
    }, [])

    const memeRef = createRef();
    return (
        <main>
            <div className="form">

                <button onClick={getMemeImage} className='form-button'>Generate a new meme image</button>
                <input type="text" value={Meme.topText} placeholder='Top text' className='form-input' name='topText' onChange={handleChange} />
                <input type="text" value={Meme.bottomText} placeholder='Bottom text' className='form-input' name='bottomText' onChange={handleChange} />
            </div>
            <div className="meme" ref={memeRef}>
                <img src={Meme.randomImage} className="meme-image" alt="Click on generate meme..." />
                <h2 className="meme--text top">{Meme.topText}</h2>
                <h2 className="meme--text bottom">{Meme.bottomText}</h2>
            </div>
            <div className='save'>
                <button variant="success" onClick={(e) => exportComponentAsJPEG(memeRef)} id='save-btn'>Download</button>
            </div>
        </main>
    )
}
