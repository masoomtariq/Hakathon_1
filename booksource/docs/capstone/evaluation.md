---
chapter_id: capstone-eval
difficulty: Advanced
duration: "90 minutes"
prerequisites: ["capstone-impl"]
tags: [capstone, evaluation, testing, validation]
---

# Evaluation & Validation

Validate and evaluate your capstone project.

## Testing Framework

### Unit Tests

Test individual components in isolation:

```python
def test_object_detection():
    # Test perception module
    assert model.predict(test_image) is not None
```

### Integration Tests

Test component interactions:

```python
def test_manipulation_pipeline():
    # Test perception → planning → control
    assert robot.grasp_object(target) == SUCCESS
```

### System Tests

Test end-to-end functionality:

```python
def test_full_task_execution():
    # Test complete task from start to finish
    assert robot.execute_task(instructions) == COMPLETED
```

## Performance Metrics

- **Accuracy**: Detection/classification accuracy (%)
- **Latency**: End-to-end task completion time (seconds)
- **Robustness**: Success rate across variations (%)
- **Safety**: Constraint violations and near-misses

## Documentation

Document your findings in:

- Project report (10-15 pages)
- Technical presentation deck
- Code repository with README
- Video demonstration
