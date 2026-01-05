# The Art of Asking Good Questions

When I started reading *Database Internals*, I realized something: **I wasn't actually reading.** I was skimming, nodding along, feeling smart — and retaining nothing.

The fix? I started asking questions. Dumb ones, obvious ones, "wait, why?" ones.

---

## The Question That Changed Everything

Here's a line from the book:

> B-trees are optimized for systems that read and write large blocks of data.

Simple enough, right? But I stopped and asked: **Why blocks? Why not individual records?**

That question led me down a rabbit hole about disk I/O, page sizes, and why SSDs didn't magically solve everything. Three hours later, I understood storage engines better than I had in months of passive reading.

---

## Types of Questions Worth Asking

I've started categorizing my questions:

| Type | Example | Why It Helps |
|------|---------|--------------|
| **"Why this way?"** | Why B-trees over hash indexes for range queries? | Reveals trade-offs |
| **"What breaks?"** | What happens if the write-ahead log fills up? | Exposes edge cases |
| **"How would I build this?"** | If I had to implement LSM trees, where would I start? | Tests real understanding |
| **"What's the opposite?"** | When would I *not* want ACID guarantees? | Breaks assumptions |

---

## A Mental Model: The Curiosity Ladder

I think of learning like climbing a ladder:

```
Level 4: "I can teach this and answer edge cases"
   ↑
Level 3: "I can apply this to new problems"
   ↑
Level 2: "I can explain this in my own words"
   ↑
Level 1: "I recognize this concept"
   ↑
Level 0: "I've never heard of this"
```

Most "reading" keeps us at Level 1. Questions push us to Level 2 and beyond.

---

## Code Example: When Theory Meets Practice

Here's something I was confused about — how does a bloom filter actually save disk reads?

```python
class SimpleBloomFilter:
    def __init__(self, size=1000):
        self.size = size
        self.bit_array = [0] * size
    
    def _hash(self, item, seed):
        # Simple hash combining item with seed
        return hash(f"{item}_{seed}") % self.size
    
    def add(self, item):
        for seed in range(3):  # Use 3 hash functions
            idx = self._hash(item, seed)
            self.bit_array[idx] = 1
    
    def might_contain(self, item):
        """Returns True if item MIGHT be in set, False if DEFINITELY not"""
        for seed in range(3):
            idx = self._hash(item, seed)
            if self.bit_array[idx] == 0:
                return False  # Definitely not in set
        return True  # Maybe in set (could be false positive)
```

The key insight: `might_contain` returning `False` means **definitely not there** — skip the disk read entirely.

---

## The "Aha" Moment

After a week of questioning everything, I noticed something shift. When someone mentioned "write amplification in LSM trees," I didn't just nod — I *felt* why it was a problem because I'd asked myself: "What happens when compaction runs during peak traffic?"

**That's the goal.** Not to memorize definitions, but to build intuition through relentless curiosity.

---

## Try This

Next time you're reading technical content:

1. **Stop every paragraph.** Ask: "Can I explain this without looking?"
2. **Find the trade-off.** Every design decision sacrifices something. What?
3. **Break it.** What input would cause this to fail?
4. **Connect it.** How does this relate to something I already know?

The goal isn't to be comprehensive. It's to be *genuinely curious*.

---

*What questions are you sitting with? I'm always interested in discussing — reach out.*

