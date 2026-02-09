---
chapter_id: ros2-nodes-topics
difficulty: Intermediate
duration: "90 minutes"
prerequisites: ["ros2-core-concepts"]
tags: [ros2, nodes, topics, communication]
---

# Nodes and Topics

Learn how to create custom nodes and work with topics in ROS 2.

## Creating a Node

ROS 2 nodes can be written in Python or C++.

### Python Node Example

```python
import rclpy
from rclpy.node import Node

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)

if __name__ == '__main__':
    main()
```

## Working with Topics

Topics allow asynchronous communication between nodes.
