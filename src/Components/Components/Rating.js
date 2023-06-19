import {BsStarFill,BsStar} from 'react-icons/bs'

function Rating({rating, change}) {
      return (
        <>
          {[...Array(5)].map((element, index)=>{
            return (
              <span key={index} onClick={()=> change(index)}>
                  {rating > index ? (<BsStarFill/>) : (<BsStar/>)}
              </span>
            )
          })}
        </>

      )

    // let length = 5;
    // let outline = length - ratings
    // return (
    //   <>
    //     {[...Array(ratings)].map((ele)=>{return <BsStarFill/>})}
    //     {[...Array(outline)].map((ele)=>{return <BsStar/>})}

    //   </>
    // );
  }
  
  export default Rating;
  