import { 
  Cable, 
  Database, 
  BrainCircuit, 
  Bot, 
  Terminal, 
  MousePointer2, 
  Activity, 
  MonitorPlay
} from "lucide-react";
import { PhaseData, ToolItem } from "./types";

export const TOOLBOX_ITEMS: ToolItem[] = [
  {
    name: "LeRobot",
    description: "Hugging Face 开源的模仿学习框架，目前上手最快、代码最少。",
    link: "https://github.com/huggingface/lerobot",
    recommended: true
  },
  {
    name: "JAKA Python SDK",
    description: "官方提供的 Python 控制包，找售后销售获取，比 ROS 简单。",
    recommended: true
  },
  {
    name: "3Dconnexion SpaceMouse",
    description: "约 1500 RMB，比用 Xbox 手柄录制的数据质量高 10 倍，能极大地减少后期清洗数据的麻烦。",
    recommended: true
  },
  {
    name: "Rerun.io",
    description: "Python 原生可视化工具，非常酷炫，能实时查看数据流和骨架。",
    link: "https://rerun.io/"
  }
];

export const PHASES: PhaseData[] = [
  {
    id: 1,
    title: "第一阶段：硬连接与基础控制",
    subtitle: "把身体接好，跑通 Hello World",
    icon: Cable,
    description: "目标：用 Python 代码能让 JAKA 动起来，并且能看到摄像头的画面。",
    steps: [
      {
        title: "物理连接与网络配置",
        content: "JAKA Zu20 网线连接到控制箱，Realsense 摄像头插到电脑 USB 3.0 (蓝色接口)。",
        warning: "电脑 IP 设为 192.168.1.100，机器人通常是 192.168.1.10。Ping 不通啥也干不了。",
        tips: ["务必使用 USB 3.0 接口连接深度相机，USB 2.0 带宽不够。"]
      },
      {
        title: "基础环境配置 (Ubuntu/WSL2)",
        content: "建议使用 Miniconda 管理 Python 环境。",
        code: `conda create -n robot_env python=3.10\nconda activate robot_env\n# 安装 JAKA SDK (本地包)\npip install ./jaka_robot_sdk-x.x.x.whl`
      },
      {
        title: "验证控制 & 简单标定",
        content: "写个 Python 脚本调用 get_joint_position()，能打印出6个关节角度就算成功。",
        tips: [
          "新手偷懒法：如果是 Eye-in-Hand (眼在手上)，不想做复杂手眼标定，可以直接在代码里写死相对位置，但支架绝对不能动。",
          "推荐使用 easy_handeye 进行标定。"
        ]
      }
    ]
  },
  {
    id: 2,
    title: "第二阶段：数据采集",
    subtitle: "手把手教机器人，最枯燥但最核心",
    icon: Database,
    description: "目标：收集 50 个“成功的码垛过程”数据文件。",
    steps: [
      {
        title: "搭建遥操作 (Teleoperation)",
        content: "不要用示教器拖拽！拖拽无法记录高频控制信号。写脚本把 SpaceMouse/手柄映射到机器人 servo_p 指令。",
        tips: ["如果不会写映射，去 GitHub 搜 HuggingFace LeRobot，他们开源了适配代码。"]
      },
      {
        title: "开始录制 (Recording)",
        content: "同步录制：必须保证“图像”和“机器人动作”时间对齐。保存为 .hdf5 或 .pt。",
        code: `# 数据帧结构示例\nframe = {\n  "image": np.array(480, 640, 3),\n  "qpos": current_joint_angles,\n  "action": target_next_angles,\n  "gripper": 1 # 吸或放\n}`
      },
      {
        title: "新手必看：数据质量",
        content: "失败的数据直接删掉，不要喂给模型“垃圾”。",
        warning: "多样性至关重要：箱子位置要微调，光照条件（开灯/关灯）也要变化，让模型学会泛化。"
      }
    ]
  },
  {
    id: 3,
    title: "第三阶段：模型训练",
    subtitle: "炼丹环节，LeRobot 一键启动",
    icon: BrainCircuit,
    description: "目标：把录好的数据喂给 AI，训练出一个权重文件 .pth。",
    steps: [
      {
        title: "安装 LeRobot",
        content: "使用 Hugging Face 的 LeRobot 框架，封装好了复杂的数学逻辑。",
        code: `git clone https://github.com/huggingface/lerobot.git\ncd lerobot\npip install -e .`
      },
      {
        title: "数据处理与可视化",
        content: "写个脚本把采集的数据转为 LeRobot 格式。使用自带的可视化工具回放，检查骨架是否对齐。",
        tips: ["这一步能发现90%的数据录制问题。"]
      },
      {
        title: "开始训练 (Diffusion Policy)",
        content: "推荐使用 Diffusion Policy (扩散策略)，对码垛这种容错率高的任务效果最好。",
        code: `python lerobot/scripts/train.py \\\n  --policy.type diffusion \\\n  --dataset.repo_id your_local_jaka_dataset \\\n  --output_dir outputs/jaka_pallet_v1 \\\n  --training.batch_size 32 \\\n  --training.steps 50000`
      }
    ]
  },
  {
    id: 4,
    title: "第四阶段：部署与推理",
    subtitle: "上岗干活，安全第一",
    icon: Bot,
    description: "目标：拔掉手柄，让机器人看着摄像头自己动。",
    steps: [
      {
        title: "推理循环 (Inference Loop)",
        content: "加载 .pth 模型，死循环读取图像 -> 预测动作 -> 执行动作。",
        code: `while True:\n    img = camera.get_frame()\n    qpos = robot.get_joints()\n    actions = model.predict(img, qpos)\n    # Receding Horizon Control\n    for i in range(8):\n        robot.servo_j(actions[i])\n        time.sleep(0.01)`
      },
      {
        title: "安全兜底 (Safety Wrapper)",
        content: "模型会有幻觉！必须写代码护栏。",
        warning: "限制Z轴高度：如果是地面，Z < 10cm 强制停机。\n限制加速度：如果指令瞬间位移过大，触发急停。",
        tips: ["先跑通一个简单的抓取动作，建立信心最重要！"]
      }
    ]
  }
];