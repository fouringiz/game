# Coordinator control study — v0.2

Date: 2026-09-16  
Status: prototype evidence; values remain draft.

## Question

Can a Coordinator escape, cause a visible mutation, and make a defensive
rebuild meaningful in the current implementation?

## Verified scenario

The experiment runs the actual browser simulation at `1/60` seconds per step.

1. Place a **Turret** in slot 8 and a **Cannon** in slot 9.
2. Run wave 4. The Coordinator exits through the entrance; one enemy leaks and
   the Gate falls from 20 to 15. Because artillery did more damage, it grants
   **Sprinter Reflex** for wave 5.
3. With the same defense, wave 5 leaks one more enemy and the Gate falls to 10.
4. Build one **Turret** in slot 0 before wave 5. The mutated wave then leaks
   none and the Gate remains at 15.

For comparison, removing the mutation from the same setup also produces no
wave-5 leak. The mutation is therefore the cause of the extra leak, and the
added Turret is a measurable countermeasure.

## Result

The Coordinator loop is playable in a narrow, controlled scenario: escaping
creates a mutation, and changing the build restores the previous outcome.

The scenario is not yet a balanced campaign verdict. It begins wave 4 with a
sparse defense and a damaged Gate, so it should be treated as a control case
for the mechanic rather than a recommended player build.
