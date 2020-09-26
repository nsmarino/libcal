import Link from 'next/link'
import styled from '@emotion/styled'

const Styles = styled.div`
  a {
    color: black;
  }
  .vis {
      position: fixed;
      left: 80%;
      top: 0;
      z-index: 100;
      background: white;
      width: 20%;
      height: 100%;
      border-left: 1px solid grey;
      box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
      transition: all 400ms;
      li {
        font-size: 200%;
        margin-bottom: 1rem;
      }
      li:hover {
        font-style: italic;
      }
  }
  .hidden {
      position: fixed;
      left: 100%;
      top: 0;
      z-index: 100;
      background: white;
      width: 20%;
      height: 100%;
      border-left: 1px solid grey;
      box-shadow: 0px 3px 15px rgba(0,0,0,0.2);
      transition: all 400ms;
  }

  @media screen and (max-width: 600px) {
    .vis {
      width: 75%;
      left: 25%;
    }
}

`

const SideBar = ({vis, setVis}) => {
    
    return (
    <Styles>
      <div className={vis ? 'vis' : 'hidden'} style={{padding: '1rem'}}>

        <ul style={{listStyleType: 'none'}}>
            <li><Link href="/login"><a>Admin Login</a></Link></li>
            <li><a href="http://carmellibrary.org/">Visit Library Site</a></li>
        </ul>
 
        <div>
          <svg onClick={() => setVis(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg>
        </div>
      
      </div>
    </Styles>
    )
}

export default SideBar