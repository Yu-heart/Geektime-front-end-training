# **GeekTime** Front-end advanced training camp
## 01. 浏览器工作原理 【How browsers work(URL->Bitmap)】
### Overview of URL->Bitmap
URL->`http`->HTML->`parse`->DOM->`CSS computing`->DOM with CSS->`layout`->DOM with position->`render`->Bitmap
### 状态机 | 有限状态机
1. 每一个状态都是一个机器  
    *  在每一个机器里，我们可以做计算、存储、输出......  
    *  所有的这些机器接受的输入是一致的  
    *  状态机的每一个机器本身没有状态，如果我们用函数来表示的话，它应该是纯函数（无副作用）  
2. 每一个机器知道下一个状态  
    *  每个机器都有确定的下一个状态（Moore）  
    *  每个机器根据输入决定下一个状态（Mealy）  
3. JS中的有限状态机(Mealy)  
      ```javascript
      //每个函数是一个状态
      function state(input) {         //函数参数就是输入
                                      //在函数中，可以自由地编写代码，处理每个状态的逻辑
            return next;              //返回值作为下一个状态
      }
      /////////以下是调用//////////
      while(input) {
      //获取输入
      state = state(input); //把状态机的返回值作为下一个状态
      }
      ```
4. 有限状态机与KMP算法  
### HTTP请求
ISO-OSI七层网络模型  
* 应用层 HTTP require("http")  
* 表示层 HTTP require("http")  
* 会话层 HTTP require("http")  
* 传输层 TCP require("net")  
* 网络层 internet  
* 数据链路层 4G/5G/Wi-Fi  
* 物理层4G/5G/Wi-Fi  
### TCP协议-——重要概念  
* 流：没有明显的分割单位，只保证前后的顺序是正确的（TCP数据传输)。  
* 端口：TCP协议是被计算机里面的软件所使用，而每一个软件都会去从网卡去拿数据，具体哪一个数据是分配给哪一个软件，就需要用到端口的概念。一个计算机网卡是根据端口把接到的数据包分给各个应用的。  
* Required(“net”):对应到node里面。  
* 包：TCP的传输是一个个数据包，这个“包”可大可小，取决于整个网络中间设备的传输能力。  
* IP地址：IP是根据地址找到包应该从哪到哪（复杂的路由节点），而这个IP地址就唯一标识了连入Internet 的每一个设备,IP包是以IP地址寻找自己要传输到哪里。  
* Libnet / libpcap: 对应IP协议的一些底层库，在node里面没有，但是node底层肯定要调到C++的两个库Libnet负责构造IP包并且发送，libpcap负责从网卡抓所有的流经网卡的IP包。  
### HTTP协议  
* Request  
    * Line  
        * Method   
        * Path  
        * Protocol version  
    * Header  
        * Body  
* Response  
    * Statusline  
        * Protocol version  
        * Status code  
        * Status text  
    * Header  
    * Body  
## 02. 重学**Javascript**  
## 03. 组件化 (**Componentization**) 
## 04. 工具链(**Toolchain**)  
## 05. 发布系统(**Publishing system**)  
## 06. 重学CSS
## 07. 重学HTML、浏览器API
