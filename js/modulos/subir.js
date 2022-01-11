export default function subirPrincipio(){

    const $header = document.querySelector("header")
    const $subir = document.getElementById("subir")

    document.addEventListener("scroll", e =>{
        let h = $header.getBoundingClientRect()
        
        //console.log(h.y)
        if(h.y <= -200){
            $subir.classList.remove("subir")
        }

         if(h.y > -200){
             $subir.classList.add("subir")
         }
    })
    
}