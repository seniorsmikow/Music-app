import { useCallback, useState, useEffect  } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import styles from './MusicAlbumCard.module.scss'
import { AlbumInfo } from '../AlbumInfo/AlbumInfo'
import { useDispatch, useSelector } from 'react-redux'
import { getAlbum } from '../../redux/selectors/musicSelectors'
import { getAlbumData } from '../../redux/artist_reducer'
import { AlbumDataType } from '../../types/albums_types'

type PropsType = {
    img: string
    name: string
    albumType: string
    totalTracks?: number
    releaseDate: string
    id: string
}

export  const MusicAlbumCard: React.FC<PropsType> = ({img, name, albumType, releaseDate, id}) => {

    const dispatch = useDispatch()
    const album = useSelector(getAlbum)
    console.log(album)
    const [albumData, setAlbumData] = useState<AlbumDataType | null>(album)

    const showAlbum = useCallback(
        () => {
            setAlbumData(null)
            dispatch(getAlbumData(id))
        },
        [id, dispatch],
    )

    useEffect(() => {
        if(album) {
            setAlbumData(album)
        }
    }, [album])

    return (
        <div className={styles.root} onClick={() => showAlbum()}>
            <Accordion className={styles.root2}>
            <AccordionSummary >
                <Avatar alt="Album" src={img} />
                <Typography>{name}</Typography>
                <Typography>{albumType}</Typography>
                <Typography>{releaseDate}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                
                {
                    albumData ? <AlbumInfo 
                                items={[...albumData.items]}/>
                            : "Loading..."
                }

            </AccordionDetails>
            </Accordion>
            <Accordion disabled>
            <AccordionSummary
                aria-controls="panel3a-content"
                id="panel3a-header">
            </AccordionSummary>
            </Accordion>
        </div>
    )
}