export default function SectionHeader({tag, title, description}) {
    return(
        <>
        <div className="flex flex-col gap-2">
            <span className="font-(family-name:--flexmono) tracking-widest text-xl text-(--blue-dark) font-extralight">{tag}</span>
                <h1 className="font-(family-name:--firesans) tracking-wide text-3xl font-black">{title}</h1>
                <p className="font-(family-name:--montserrat) text-md text-(--ink-soft) font-extralight">{description}</p>
        </div>
        </>
    )
}