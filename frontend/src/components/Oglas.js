function Oglas(props) {
    if(props.align === "left"){
        return (
            <div style={{ width:"10%",height:"90vh", float:"left", background:"#29648A" }}>
                <div style={{ background:"#25274D", margin:"10px", height:"93%", color:"white" }}>
                <h2 style={{ textAlign:"center", paddingTop:"250px" }}>OGLAS</h2>
                </div>
            </div>
        );
    }
    else{
        return (
            <div style={{ width:"12%",height:"90vh", float:"right", background:"#29648A"}}>
                <div style={{ background:"#25274D", margin:"10px", height:"93%", color:"white" }}>
                <h2 style={{ textAlign:"center", paddingTop:"250px" }}>OGLAS</h2>
                </div>
                
            </div>
        );
    }
    
}
export default Oglas;