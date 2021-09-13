import React, { useEffect } from 'react'
import useStorage from '../../hooks/useStorage';
import classes from './ProgressBar.module.css';

const ProgressBar = ({ image, setImage, passUrl }) => {
    
    const { url, progress } = useStorage(image);
    
    useEffect(() => {
        if (url) {
            passUrl(url);
            setImage(null);
        }
    }, [url, setImage, passUrl])    
    
    return (
        <div className={classes['progress-bar']} style={{ width: progress + '%' }}></div>
    )
}

export default ProgressBar;