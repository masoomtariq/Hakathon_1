---
chapter_id: gazebo-physics
difficulty: Advanced
duration: "90 minutes"
prerequisites: ["gazebo-worlds"]
tags: [gazebo, physics, simulation, dynamics]
---

# Physics Engine

Understand and configure physics simulation in Gazebo.

## Physics Engines

Gazebo supports multiple physics engines:

- **ODE** (Open Dynamics Engine)
- **Bullet**
- **DART**
- **Simbody**

## Configuring Physics

Physics parameters control simulation accuracy and speed.

```xml
<physics type='ode'>
  <max_step_size>0.001</max_step_size>
  <real_time_factor>1.0</real_time_factor>
  <real_time_update_rate>1000</real_time_update_rate>
</physics>
```
