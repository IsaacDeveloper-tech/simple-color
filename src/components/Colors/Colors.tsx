import style from "./Colors.module.css";

type ColorProps = {
    colorBackground:string,
    colorText:string
};

export function Colors(){
    return(
        <div className={style.colors}>
            <Color colorBackground="blue" colorText="red" />
            <Color colorBackground="green" colorText="yellow" />
            <Color colorBackground="cian" colorText="pink" />
            <Color colorBackground="black" colorText="white" />
        </div>
    );
}

function Color(data:ColorProps){
    return(
        <div className={style.color}>
            <div className={style.color_background} style={{backgroundColor:data.colorBackground}}>
                <span>{data.colorBackground}</span>
            </div>
            <div className={style.color_text} style={{backgroundColor:data.colorText}}>
                <span>{data.colorText}</span>
            </div>
        </div>
    );
}