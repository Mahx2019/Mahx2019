
let responeOfOrign = () => {
    label = document.getElementById('originLabel');
    if(label.style.display == "block"){
        label.style.display = "none"
    }else{
        label.style.display = "block"
    }
}

// let responeOfPart = (e) =>{
//     // console.log(e)
//     if(e.style.display == 'none'){
//         e.style.display = 'block'
//     }else{
//         e.style.display = 'none'
//     }
// }

let mainFunc = ()=>{
    let valueMap = new Map();

    //固定值
    // F = parseInt(document.getElementById('F').innerText.match(/\=(.*?)\K/)[1])
    // H = parseInt(document.getElementById('H').innerText.match(/\=(.*?)\m/)[1])
    F = 45
    H = 190
    //固定值
    let mu = 0.1,
        alpha = 0,
        sigma45 = 353,
        n = 1,
        S = 3;


    //1.螺杆的设计与计算
    sigma_adp = Math.round((sigma45 / S), 0)//MPa
    console.log('sigma_adp ==>', sigma_adp)
    d_1_min = Math.sqrt((4 * 1.3 * F * 1000) / (Math.PI*sigma_adp))
    valueMap.set('d_1_min', d_1_min)
    console.log('d_1_min ==>',d_1_min)
    P = d_1_min / 4 //mm    w
    console.log('P ==>',P)
    valueMap.set('P_pre', P)
    //参考标准
    P = Math.floor(P)
    console.log('New P ==>',P)
    valueMap.set('P', P)
    h = P / 2
    console.log('h ==>',h)
    valueMap.set('h',h)
    d = Number(d_1_min + P )
    console.log('d ==>',d)
    valueMap.set('d_pre',d)
    //圆整
    d = Number(Math.ceil(d))
    valueMap.set('d',d)
    console.log('New d ==>',d)
    d_1 = Number(d - P)
    valueMap.set('d',d)
    console.log('d_1 ==>',d_1)
    valueMap.set('d_1',d_1)
    rhi_ = Math.atan(mu / Math.cos(alpha/2)) * 57.3//circ
    console.log('rhi_ ==>',rhi_)
    valueMap.set('rhi_',rhi_)
    d_2 = Number(d_1 + d)/2 //mm
    console.log('d_2 ==>',d_2)
    valueMap.set('d_2',d_2)
    phi = Math.atan((n * P)/(Math.PI * d_2)) * 57.3
    console.log('phi ==>',phi)
    valueMap.set('phi',phi)
    if(phi <= rhi_ - 1){
        console.log('phi <= rhi_ - 1 ==> yes')
    }else{
        console.log('phi <= rhi_ - 1 =x= noo')
    }
    //手柄孔径d_k 手柄直径 d_p
    // d_k = d_p + 0.5 //0.5???
    // console.log('d_k ==>',d_k)
    //退刀槽直径d_t 宽度w_t
    d_t = d_1 - 0.5
    w_t = 1.5 * P
    console.log('d_t ==>',d_t)
    valueMap.set('d_t',d_t)
    console.log('w_t ==>',w_t)
    valueMap.set('w_t',w_t)
    //挡圈直径d_0
    d_0 = d + 5
    console.log('d_0 ==>',d_0)
    valueMap.set('d_0',d_0)
    //挡圈厚度6-12mm d_thick
    //螺钉直径l_d
    l_d = 0.25 * d
    console.log('l_d ==>',l_d)
    valueMap.set('l_d',l_d)
    T = F * d_2 * Math.tan((phi + rhi_)/180*Math.PI) /2
    console.log('T ==>',T)
    valueMap.set('T',T)
    sigma_v = Math.sqrt(Math.pow((4 * F * 1000/ Math.PI / d_1 / d_1),2) + 3 * Math.pow((T * 1000*1000*1000 /0.2/d_1/d_1/d_1),2))/Math.pow(10,6)//MPa
    console.log('sigma_v ==>',sigma_v)
    valueMap.set('sigma_v',sigma_v)
    if(sigma_v <= sigma_adp){
        console.log('sigma_v <= sigma_adp ==> yes')
    }else{
        console.log('sigma_v >= sigma_adp =x= noo')
    }
    //2.螺母的设计与计算
    //螺纹圈数
    p_adp = 25 //MPa
    dlw_2 = 31 //mm???
    hlw = 3 //mm
    Z = F * 1000/Math.PI/dlw_2/hlw/p_adp
    console.log('Z ==>',Z)
    valueMap.set('Z_pre',Z)
    Z = Math.ceil(Z)
    console.log('New Z ==>',Z)
    valueMap.set('Z',Z)
    //实际螺纹圈数，1.5退刀槽影响
    Z_ = Z + 1.5
    console.log('Z_ ==>',Z_)
    valueMap.set('Z_',Z_)
    H_ = Z_ * P
    console.log('H_ ==>',H_)
    valueMap.set('H_',H_)
    //螺纹其他尺寸
    a = H_ / 3
    D = 1.6*d
    console.log('D ==>',D)
    valueMap.set('D_pre',D)
    D = Math.ceil(D)
    console.log('New D ==>',D)
    valueMap.set('D',D)
    D_1 = 1.3*D
    console.log('D_1 ==>',D_1)
    valueMap.set('D_1_pre',D_1)
    D_1 = Math.ceil(D_1)
    console.log('New D_1 ==>',D_1)
    valueMap.set('D_1',D_1)


    //3.螺杆稳定性计算
    //螺杆稳定性计算安全因数S_sc
    //螺杆稳定性安全因数S_s
    //螺杆的临界载荷F_cr
    //螺杆的长细比lambda
    //长度系数mu_2
    //螺杆最大受压长度l
    //螺杆危险截面惯性半径i
    mu_2 = 2
    l = H + H_/2 + 1.5*d
    console.log('l ==>',l)
    valueMap.set('l',l)
    i = d_1/4
    console.log('i ==>',i)
    valueMap.set('i',i)
    lambda = mu_2*l/i
    console.log('lambda ==>',lambda)
    valueMap.set('lambda',lambda)
    //对于lambda<85淬火钢
    F_cr = 480/(1+0.0002*lambda*lambda)*Math.PI*d_1*d_1/4/1000
    console.log('F_cr ==>',F_cr)
    valueMap.set('F_cr',F_cr)
    //
    S_sc = F_cr / F 
    console.log('S_sc ==>',S_sc)
    valueMap.set('S_sc',S_sc)
    if(S_sc>= 2.5&&S_sc<4){
        console.log('S_sc ==> 设计成功')
    }else{
        console.log('S_sc =x= 设计失败')
    }


    //4.托杯的设计与计算
    //壁厚 delta
    //托杯高 tb_h(1.5-1.8d)
    tb_h = 1.6*d
    console.log('tb_h ==>',tb_h)
    valueMap.set('tb_h',tb_h)
    D_2 = 0.6*d
    console.log('D_2 ==>',D_2)
    valueMap.set('D_2_pre',D_2)
    D_2 = Math.ceil(D_2)
    console.log('New D_2 ==>',D_2)
    valueMap.set('D_2',D_2)
    D_3 = 2.4*d
    console.log('D_3 ==>',D_3)
    valueMap.set('D_3_pre',D_3)
    D_3 = Math.ceil(D_3)
    console.log('New D_3 ==>',D_3)
    valueMap.set('D_3',D_3)
    p_adp2 = 20
    D_4 = Math.sqrt(4*F/(Math.PI*p_adp2)*1000 + D_2*D_2)
    console.log('D_4 ==>',D_4)
    valueMap.set('D_4_pre',D_4)
    D_4 = Math.ceil(D_4)
    console.log("New D_4 ==>",D_4)
    valueMap.set('D_4',D_4)

    
    //5.手柄的设计与计算
    //手柄长度L_p
    //转矩KL_p\
    //螺纹副的螺纹力矩M_1
    //螺杆与托杯间的摩擦力矩M_2
    mu_3 = 0.06
    K = 200
    M_1 = F * Math.tan((phi + rhi_)/180 *Math.PI) *d_2 / 2
    console.log('M_1 ==>',M_1)
    valueMap.set('M_1',M_1)
    M_2 = 0.25 * (D_2 + D_4)*mu_3*F
    console.log('M_2 ==>',M_2)
    valueMap.set('M_2',M_2)
    L_p = (M_1+M_2)/K*1000 //mm
    console.log('L_p ==>',L_p)
    valueMap.set('L_p',L_p)
    L_w = L_p + 0.5 * D_4 + 100
    console.log('L_w ==>',L_w)
    valueMap.set('L_w',L_w)
    //对于Q235的手柄材料的许用弯曲应力sigma_adpb
    sigma_adpb = 120
    console.log('sigma_adpb ==>',sigma_adpb)
    valueMap.set('sigma_adpb',sigma_adpb)
    d_p = Math.pow((K*L_p/0.1/sigma_adpb),1/3)
    console.log('d_p ==>',d_p)
    valueMap.set('d_p',d_p)
    //螺杆孔径d_k
    d_k = d_p + 0.5
    console.log('d_k ==>',d_k)
    valueMap.set('d_k',d_k)


    //6.底座的设计与计算
    console.log('6.底座的设计与计算')
    //壁厚 delta 
    //锥度zd 1：5
    zd = 5
    delta = 10
    sigma_adpp = 2.5//MPa

    H_1 = H+20
    console.log('H_1 ==>',H_1)
    valueMap.set('H_1',H_1)
    D_5 = D+6
    console.log('D_5 ==>',D_5)
    valueMap.set('D_5',D_5)
    D_6 = D_5+H_1/zd
    console.log('D_6 ==>',D_6)
    valueMap.set('D_6',D_6)
    D_7 = Math.sqrt(4*F/Math.PI/sigma_adpp*1000 + D_6*D_6)
    console.log('D_7 ==>',D_7)
    valueMap.set('D_7',D_7)
    D_8 = Math.ceil(D_1)
    console.log('D_8 ==>',D_8)
    valueMap.set('D_8',D_8)


    //7.千斤顶的效率
    console.log('7.千斤顶的效率')
    //效率eta
    eta = F*P/2/Math.PI/(M_1+M_2)
    console.log('eta ==>',eta)
    valueMap.set('eta',eta)
    if(eta>0&&eta<0.3){
        console.log('设计效率符合要求 ==> yes')
    }else{
        console.log('设计效率不符合要求 =x= noo')
    }

    //
    console.log(valueMap)
    return valueMap
}


let view_ = (valueMap = mainFunc()) =>{

    // document.getElementById(key).innerText='95'
    // let valueMap1 = new Map();
    // valueMap1.set('F',99);

    valueMap.forEach((value, key)=>{
        // console.log(value)
        if(document.getElementById(key) != null){
            let current=document.getElementById(key);
            current.innerText = Number(value).toFixed(2);
            current.style.backgroundColor = 'white' ;
        }
    })
}
view_()

let getStyle = (dom, attr) => {
    if (dom.currentStyle) {
        return dom.currentStyle[attr]
    } else {
        return getComputedStyle(dom)[attr]
    }
}

let clickMouse = () =>{
    let el = window.document.body; // 声明一个变量，默认值为body
    window.document.body.onclick = function(event){
        el = event.target;
        // console.log(el.nodeName);
        // el.nodeName === 'H2'
        if(el.className === 'h2btn'){
            // console.log(el.nodeName);
            if(getStyle(el.parentNode.nextElementSibling, 'display') == 'none'){
                el.parentNode.nextElementSibling.style.display = 'block';
                el.innerText = '点击收起';
            }else{
                el.parentNode.nextElementSibling.style.display = 'none';
                el.innerText = '点击展开';
            }
        }
    }
}
clickMouse()
