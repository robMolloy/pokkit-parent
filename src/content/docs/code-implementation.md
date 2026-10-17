# Code implementation

Prefer code that a reader can follow in one pass. Unnecessary abstraction—extra layers, indirection, generic helpers, or configuration-driven structure—often hides what actually happens and makes small changes harder.

Duplication is not always wrong. Repeating a few lines in two places can be clearer than forcing everything through a shared abstraction that only kind of fits both call sites.

It is fine for code to be a little longer when that length is honest: explicit steps, named values, and straightforward control flow beat a short snippet that requires jumping through three files to understand.

Reach for abstraction when the pattern is real, stable, and repeated—not because shorter line counts look tidy in a diff.
