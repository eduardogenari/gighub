export type Artist = {
    id: string;
    name : string
    genres : string[] 
    images : {
        height : number
        url : string
        width : number
    }
    popularity: number

}

export type Track = {
    id : string
    name : string
    popularity : number
    preview_url : string
    uri : string
}