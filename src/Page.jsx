import React from 'react'
import { useReducer,useRef,useState } from 'react'
import { GET_CAPITAL,GET_SUBREGION } from './useReducer/actions'
import reducer from './useReducer/reducer'
import useFetch from './useFetch'

export const Page = () => {
//   const defaultState = {
//     data: [],
//     isError: false,
//   }

    

    const input = useRef('')
    const url = useRef('')

    const [isDone, setIsDone] = useState(false)

//   const [state, dispatch] = useReducer(reducer, defaultState)


  // const { avatar_url, name, company, bio } = fetchTheData(url);

  const handleSubmission =(e)=>{
    e.preventDefault()
    url.current = `https://restcountries.com/v2/name/${input.current.toLowerCase()}`
    setIsDone(true)

    
  }


  return (
    <div>
      {
        isDone ? (
            <Country url ={url.current}/>
        ):
        // state.data.length ? (
        //   <h2>OK</h2>
        // ) : state.isError ? (
        //   <h2>There was an error</h2>
        // ) : 
        (
          <form className="form" ref={input} onSubmit={handleSubmission}>
            <label htmlFor="name">Country: </label>
            <input
              type="text"
              onChange={(e) => {
                input.current = e.target.value
              }}
            />
            <button>enter</button>
          </form>
        )
        //     {
        //   object.isError ? (
        //     <h2>Loading...</h2>
        //   ) : state.isError ? (
        //     <h2>There was an error...</h2>
        //   ) : (
        //     <div>

        //     </div>
        //   )
        //   }
      }
    </div>
  )
}
const Country = (props) => {

    const {isError,isLoading, data} = useFetch(props.url)

    if(isLoading){
        return <h2>Loading...</h2>
    }
    if(isError){
        return <h2>Is error</h2>
    }
    
    return <Info data = {data[0]}/>

}

const Info = (props)=>{
    
  const defaultState = {
    capital: null,
    subregion: null,
  }


  const [state, dispatch] = useReducer(reducer, defaultState)

const getCapital = () => {
  dispatch({ type: GET_CAPITAL, payload: props.data })
}

const getSubregion = () => {
  dispatch({ type: GET_SUBREGION, payload: props.data })
}


  return (
    <div>
      <button
        className="btn"
        style={{ marginTop: '2rem' }}
        onClick={getCapital}
      >
        {state.capital || 'get capital'}
      </button>

      <button
        className="btn"
        style={{ marginTop: '2rem' }}
        onClick={getSubregion}
      >
        {state.subregion || 'get subregion'}
      </button>
    </div>
  )
}
