import React from 'react'
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import SvgIcon from '@mui/material/SvgIcon';
import { TiArrowLeftOutline } from "react-icons/ti";

export default function BackLink(props){
    return (
        <Box pt={"2rem"}>
    <Link href={`http://localhost:3000/AlbumY/${props.userId}`}>
            <SvgIcon component={TiArrowLeftOutline} inheritViewBox />
    </Link>
    </Box>)

}