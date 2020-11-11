exports.filterWord = (title)=>{
    if(title) return /(ASUS | 에이수스 | 이엠텍 | 에브가 | Evga | Emtek).+ (3080)/.exec(title)
    else  return false
}