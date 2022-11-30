function sencondsToMinutes(time){
    /////calculos para transformar o segundos em minutos e arredondar os segundos////
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor( time % 60);
    //código abaixo usa o slice para mostras apenas as duas ultimas casas decimais///
    return `${("0" + minutes).slice(-2)}:${("0" + seconds).slice(-2)}`
  }
  export {sencondsToMinutes}