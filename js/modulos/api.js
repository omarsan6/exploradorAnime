export default function buscador() {
    const d = document
    const $form = d.getElementById("form")
    const $nombre = d.getElementById("nombre")
    const $oval = d.getElementById("oval")

    $form.addEventListener("submit", async e => {
        e.preventDefault()

        let nombre = $nombre.value
        let url = `https://api.jikan.moe/v3/search/anime?q=${nombre}`

        if (nombre == '') return alert("Ingrese un personaje")

        try {
            $oval.innerHTML = `<img src=../../assets/oval.svg srcset=../../assets/oval.svg></img>`
            let res = await fetch(url)//hacemos la peticion a la api
            let json = await res.json()

            // if(json.status !== 200){
            //     $oval.innerHTML= ''
            //     return alert("Error")
            // } 
            //verificar si existe elemento en el dom
            const $bTarjeta = !!d.getElementById("tarjeta")

            if ($bTarjeta === true) {
                const $main = document.querySelector("main");
                //si el main tiene un nodo hijo
                while ($main.firstChild) {
                    $main.removeChild($main.firstChild);//elimina ese nodo hijo
                }
                tarjeta(json)
            } else {
                tarjeta(json)
            }

            if(!res.ok) throw {status:res.status, statusText: res.statusText}
        } catch (error) { 
            console.log(error)
        }
    })

    const tarjeta = (json) => {

        const $template = d.getElementById("template").content
        const $main = d.querySelector("main")
        const $fragment = d.createDocumentFragment()
        let animes = json.results
        //console.log(animes)

        const datosAnime = animes.map(function (e) {
            let nombreAnime = e.title
            let tipo = e.type
            let imgURL = e.image_url
            let url = e.url

            $template.querySelector("img").src = imgURL
            $template.querySelector(".f1").textContent = nombreAnime
            $template.querySelector(".f2").textContent = tipo
            $template.querySelector("a").href = url
            $template.querySelector("a").textContent = 'Ver más'

            let clone = d.importNode($template, true)
            $fragment.appendChild(clone)

            $main.appendChild($fragment)

            $oval.innerHTML = ""
        })

        //datosAnime()



    }


}