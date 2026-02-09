---
chapter_id: gazebo-worlds
difficulty: Intermediate
duration: "75 minutes"
prerequisites: ["gazebo-basics"]
tags: [gazebo, worlds, sdf, modeling]
---

# Building Worlds

Create custom simulation worlds in Gazebo using SDF (Simulation Description Format).

## SDF Files

SDF is an XML-based format for describing robot models and environments.

## Example World File

```xml
<?xml version='1.0'?>
<sdf version='1.6'>
  <world name='default'>
    <include>
      <uri>model://ground_plane</uri>
    </include>
    <include>
      <uri>model://sun</uri>
    </include>
  </world>
</sdf>
```

## Best Practices

- Use proper coordinate frames
- Version control your world files
- Document model assumptions
