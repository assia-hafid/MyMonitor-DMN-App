
const sleep = ()=>{
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            console.log("Hello 2")
            resolve()
        },1000)
    })
}

const run = async ()=>{
    console.log("hello 1")

    await sleep()

    console.log("hello 3")

}

run();



