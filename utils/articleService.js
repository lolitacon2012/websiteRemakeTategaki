import article from "../build/article";
import { colors } from "../components/colors";
export const getArticle = (id) => {
    return article.articles[id];
}

export const getArticleList = (limit = -1) => {
    
    const list = Object.keys(article.articles).map((e)=>{
        const obj = article.articles[e];
        return {title:obj.title,time: obj.time,tags: obj.tags,abstract: obj.abstract,image: obj.image,id: obj.id, timeNumber:obj.timeNumber};
    }).sort((a,b)=>{
        return a.timeNumber - b.timeNumber;
    })
    console.log(list)
    return limit>0?(list.slice(0, limit)):list;
}

export const getArticleMeta = (id) => {
    const article = getArticle(id);
    return {
        time: article.time,
        timeNumber: article.timeNumber,
        tags: article.tags,
        image: article.image,
        title: article.title
    }
}

export const search = (keyWord) => {

}

export const renderArticle = (id)=>{
    let idAdder = 0;
    const forceHorizontal = !!getArticle(id).forceHorizontal;
    const result = getArticle(id).content.map((element)=>{
        idAdder++;
        switch (element.el){
            case "p":
            return (<p className={forceHorizontal? "":"tategaki"} style={{
                lineHeight: "2rem",
                fontSize: "1.2rem",
                letterSpacing: "1.66px",
                margin: "0 2rem",
            }} key={id + "-el-" + idAdder}>{element.content}</p>)
            case "h1":
            //not used
            return (<h1 style={{
                lineHeight: "2.8rem",
                fontSize: "2.8rem",
                letterSpacing: "0",
                margin: "0 2rem",
                fontWeight: "normal",
            }} className={forceHorizontal? "":"tategaki"} key={id + "-el-" + idAdder}>{element.content}</h1>)
            case "h2":
            return (<h2 style={{
                lineHeight: "2.2rem",
                fontSize: "2.2rem",
                letterSpacing: "0",
                margin: "0 2rem",
                fontWeight: "normal",
            }} className={forceHorizontal? "":"tategaki"} key={id + "-el-" + idAdder}>{element.content}</h2>)
            case "h3":
            return (<h3 style={{
                lineHeight: "2rem",
                fontSize: "2rem",
                letterSpacing: "0",
                margin: "0 2rem",
                fontWeight: "normal",
            }} className={forceHorizontal? "":"tategaki"} key={id + "-el-" + idAdder}>{element.content}</h3>)
            case "h4":
            return (<h4 style={{
                lineHeight: "1.8rem",
                fontSize: "1.8rem",
                letterSpacing: "0",
                margin: "0 2rem",
                fontWeight: "normal",
            }} className={forceHorizontal? "":"tategaki"} key={id + "-el-" + idAdder}>{element.content}</h4>)
            case "h5":
            return (<h5 style={{
                lineHeight: "1.4rem",
                fontSize: "1.4rem",
                letterSpacing: "0",
                margin: "0 2rem",
                fontWeight: "normal",
            }}  className={forceHorizontal? "":"tategaki"} key={id + "-el-" + idAdder}>{element.content}</h5>)
            case "h6":
            return (<h6 style={{
                lineHeight: "1.1rem",
                fontSize: "1.1rem",
                letterSpacing: "0",
                margin: "0 2rem",
                fontWeight: "normal",
            }} className={forceHorizontal? "":"tategaki"} key={id + "-el-" + idAdder}>{element.content}</h6>)
            case "quote":
            return (
                <div key={id + "-el-" + idAdder} style={{
                    height: "100%",
                    borderTop: "6px solid" + colors.gray,
                    margin: "0 2rem",
                    padding: "2rem 0"
                }}>
                    <p className={forceHorizontal? "":"tategaki"} style={{
                lineHeight: "2rem",
                fontSize: "1.2rem",
                letterSpacing: "1.66px",
                margin: "0 0.5rem",
                color: colors.darkGray,
                }}>{element.content}</p>
                </div>
            )
            case "img":
            return (
                <div key={id + "-el-" + idAdder} style={{
                    height: "100%",
                    width: "auto",
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "0 2rem"
                }}>
                    <img src={element.src} style={{
                        height: "90%",
                        width: "auto",
                        background: "#122212"
                    }}/>
                    {!!element.comment && (<p className="tategaki" style={{
                        color: colors.gray,
                        margin: "1rem",
                        padding: 0,
                        fontSize: "1rem",
                        fontWeight: "normal",
                    }}>{element.comment}</p>)}
                </div>
            
            )
        }
    })
    return result;
}

export const renderSearchResult = (searchResult) => {

}

export const searchTag = (tag) => {

}

export const searchTime = (begin, end) => {
    
}