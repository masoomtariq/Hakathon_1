import type {SidebarsConfig} from '@docusaurus/types';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'ROS 2 Fundamentals',
      link: {type: 'doc', id: 'ros-2/index'},
      items: [
        'ros-2/getting-started',
        'ros-2/core-concepts',
        'ros-2/nodes-and-topics',
      ],
    },
    {
      type: 'category',
      label: 'Gazebo & Unity Simulation',
      link: {type: 'doc', id: 'gazebo-unity/index'},
      items: [
        'gazebo-unity/simulation-basics',
        'gazebo-unity/building-worlds',
        'gazebo-unity/physics-engine',
      ],
    },
    {
      type: 'category',
      label: 'NVIDIA Isaac Robotics',
      link: {type: 'doc', id: 'isaac/index'},
      items: [
        'isaac/digital-twins',
        'isaac/perception',
      ],
    },
    {
      type: 'category',
      label: 'Vision Language Models (VLA)',
      link: {type: 'doc', id: 'vla/index'},
      items: [
        'vla/model-training',
        'vla/deployment',
      ],
    },
    {
      type: 'category',
      label: 'Capstone Project',
      link: {type: 'doc', id: 'capstone/index'},
      items: [
        'capstone/project-scope',
        'capstone/implementation',
        'capstone/evaluation',
      ],
    },
  ],
};

export default sidebars;
