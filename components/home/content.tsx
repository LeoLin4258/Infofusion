"use client";
import React from "react";
import { Button, Card, CardBody, Chip, Link, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { Alert, Step, StepLabel, Stepper } from "@mui/material";


export const Content = () => {
  const features=[
    {
      title:"查看微信聊天记录📋",
      description:"支持显示多模态的聊天记录",
      cardColor:"primary"
    },
    {
      title:"导出聊天数据📤",
      description:"支持导出私信及群聊为jsonl格式",
      cardColor:"default-50"
    },
    {
      title:"聊天续写✨",
      description:"使用RWKV进行聊天续写",
      cardColor:"success"
    },
  ]

  return(
    <div className="h-full lg:px-6">
    <div className="flex w-full justify-center items-center mt-20 text-4xl font-semibold">
      👋欢迎使用 InfoFusion for RWKV <Chip>V 0.0.1</Chip>
    </div>

    <div className="w-full flex justify-center items-center mt-8"><Chip color="success" variant="flat">所有聊天记录都将留在本地</Chip></div>

    <div className="flex justify-center gap-4 xl:gap-6 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">

      <div className="mt-6 gap-20 flex flex-col w-full">

        <div className="flex flex-col gap-2">
          <h3 className="text-xl font-semibold">你可以🛝</h3>
          <div className="grid md:grid-cols-2 grid-cols-1 2xl:grid-cols-3 gap-5  justify-center w-full">
          {features.map((feature,index)=>(
            <Card key={index} className={`xl:max-w-sm rounded-xl shadow-md px-3 w-full min-h-40 bg-${feature.cardColor}`}>
            <CardBody className="py-5">
              <div className="flex flex-col gap-2.5 justify-center items-center h-full">
                <div className="text-xl font-semibold">{feature.title}</div>
                <div className="text-md ">{feature.description}</div>
              </div>
            </CardBody>
          </Card>
          ))}

          </div>
        </div>


        <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">快速开始🚀</h3>
          <div className="w-full bg-default-50 shadow-lg rounded-2xl p-6 min-h-40 flex justify-center items-center ">
            <Stepper alternativeLabel activeStep={9} className="w-full">
              <Step key={"1"}>
                <StepLabel ><p className="t text-black dark:text-white">打开并登录微信</p></StepLabel>
              </Step>
              <Step key={"2"}>
                <StepLabel ><p className="t text-black dark:text-white">启动PyWxDump<br></br><Link isExternal showAnchorIcon href="https://github.com/xaoyaoo/PyWxDump">下载地址</Link></p></StepLabel>
              </Step>
              <Step key={"3"}>
                <StepLabel ><p className="t text-black dark:text-white">启动RWKV Runner续写 <br></br><Link isExternal showAnchorIcon href="https://rwkv.cn/RWKV-Runner/Introduction">Runner教程</Link></p></StepLabel>
              </Step>
              <Step key={"4"}>
                <StepLabel ><p className="t text-black dark:text-white">前往设置页面导入微信数据</p></StepLabel>
              </Step>
              <Step key={"5"}>
                <StepLabel ><p className="t text-black dark:text-white">前往聊天页面开始使用🎉</p></StepLabel>
              </Step>

            </Stepper>
          </div>
        </div>

        <div className="h-full flex flex-col gap-2">
          <h3 className="text-xl font-semibold">使用到的项目🛠️</h3>

          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>项目</TableColumn>
              <TableColumn>作用</TableColumn>
              <TableColumn>地址</TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow key="1">
                <TableCell>PyWxDump</TableCell>
                <TableCell>逆向微信聊天数据</TableCell>
                <TableCell><Link isExternal showAnchorIcon href="https://github.com/xaoyaoo/PyWxDump">GitHub 地址</Link></TableCell>
              </TableRow>
              <TableRow key="2">
                <TableCell>RWKV Runner</TableCell>
                <TableCell>提供续写功能</TableCell>
                <TableCell><Link isExternal showAnchorIcon href="https://rwkv.cn/RWKV-Runner/Introduction">Runner 教程</Link></TableCell>
              </TableRow>
              <TableRow key="3">
                <TableCell>InfoFusion</TableCell>
                <TableCell>前端页面，负责调度以上两个工具</TableCell>
                <TableCell>暂未开源</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="w-full flex flex-col gap-2 justify-center items-center mb-4" >
          <a href="/settings" className="w-full">
          <Button fullWidth color="primary" >立刻开始</Button>
          </a>
          <Chip variant="dot" color="warning" size="md">请遵守相关法律法规</Chip>
        </div>
      </div>
    </div>
  </div>
  )
};
