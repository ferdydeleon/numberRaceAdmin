const CraffstreamPlayer = ({
    organization = "pcc",
    contentId = "ramoj",
    userId,
    authToken,
  }) => {
   
    const [hasError, setHassError] = useState(false)

    useEffect(() => {
      const delay = setTimeout(() => {
        try {
          window.craffstream.attachPlayer(
            "cspvideoplayer",
            organization,
            contentId,
            { userId, authToken, autoplay: true }
          )
        } catch (error) {
          setHassError(true)
          console.error(error)
        }
  
        return () => clearTimeout(delay)
      }, 2000)
    }, [hasError, organization, contentId, userId, authToken])
  
    console.log(window.craffstream)
    return (
      <React.Fragment>
        {hasError && <div style={{ color: "white" }}>Cannot display player.</div>}
        <div
          id="cspvideoplayer"
          style={{ width: "100%", miHeight: "450px", height: "100%" }}
        ></div>
      </React.Fragment>
    )
  }
 

  export default React.memo(CraffstreamPlayer)