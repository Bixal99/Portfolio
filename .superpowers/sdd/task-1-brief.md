### Task 1: Update Portfolio Data

**Files:**
- Modify: `src/data/portfolio.ts:65-85`

**Interfaces:**
- Consumes: N/A
- Produces: Updated `profile` and `heroStats` objects.

- [ ] **Step 1: Update the profile and heroStats data**

Update `profile.thesis` and `heroStats` to match the new design.

```typescript
export const profile = {
  name: "Mohammad Bilal",
  role: "Software Engineer | AI Engineer",
  location: "Doha, Qatar",
  thesis: "Building Scalable Solutions for Real-World Problems",
  intro: "Hi, I am Mohammad Bilal, an AI Engineer specializing in",
  summary:
    "Computer Science student with hands-on experience in AI, computer vision, and full-stack development through academic and personal projects. Skilled in Python, JavaScript, React, Node.js, and machine learning.",
  email: "bilalnadeema302003@gmail.com",
  phone: "+923470405422",
};

export const heroStats: HeroStat[] = [
  { value: "7+", label: "Solutions Delivered" },
  { value: "100%", label: "Success Rate" },
  { value: "AI", label: "Focus" },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "chore: update profile and hero stats for new design"
```