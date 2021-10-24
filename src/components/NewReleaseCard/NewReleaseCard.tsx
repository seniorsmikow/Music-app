import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { useHistory } from 'react-router'
import { ArtistsNamesType } from '../../types/music_types'

type PropsType = {
    album_type: string,
    name: string,
    release_date: string,
    total_tracks: number,
    image: string,
    artistsNames: Array<ArtistsNamesType>,
    artistId: string
}


export const NewReleaseCard: React.FC<PropsType> = ({album_type, name, release_date, total_tracks, image, artistsNames, artistId}) => {

    const history = useHistory()

    const showArtistPage = (id: string) => {
        history.push(`/artist/${id}`)
    }

    return (
        <Card sx={{ display: 'flex', 
                    backgroundColor: '#f1f1f1', 
                    justifyContent: 'center', 
                    margin: '0 auto', 
                    marginTop: '20px', 
                    color: '#414208', 
                    width: '600px',
                    padding: '0px' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h5" sx={{ width: 300 }}>
                    {name}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    {album_type}
                </Typography>
                {
                    artistsNames.map(artist => <Typography variant="subtitle1"  component="div">
                                                <button onClick={() => showArtistPage(artist.id)} key={artist.id}>
                                                    {artist.name}
                                                </button>
                                                </Typography>)
                }
                <Typography component="div" variant="subtitle1" sx={{ width: 300 }} color="text.secondary">
                    дата выхода {release_date}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" component="div">
                    количество треков {total_tracks}
                </Typography>
                </CardContent>
            </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={image}
                alt="Live from space album cover"
            />
        </Card>
    )
}
