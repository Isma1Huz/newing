import './DestCard.css'

function DestCard({imagepath,header, subHeader }){
    return (
        <>
        <div className="card-cont">
            <h4>{header}</h4>
            <p>{subHeader}</p>
        </div>
        </>
    )

}

export default DestCard;