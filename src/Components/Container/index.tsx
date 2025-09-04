import type { ReactNode } from "react"
import style from "./Container.module.scss"

const Container = ({ children }: { children: ReactNode }) => {
    return (
        <div className={style.container}>{children}</div>
    )
}

export default Container