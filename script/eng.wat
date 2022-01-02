(module
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (import "env" "memset" (func $memset (param i32 i32 i32) (result i32)))
 (table 0 anyfunc)
 (memory $0 3)
 (data (i32.const 32) "\02")
 (data (i32.const 48) "\0f")
 (export "memory" (memory $0))
 (export "_Z16createEmptyListsv" (func $_Z16createEmptyListsv))
 (export "_Z14createIdxListsv" (func $_Z14createIdxListsv))
 (export "_Z14createIdxTablev" (func $_Z14createIdxTablev))
 (export "_Z7moveIdxhch" (func $_Z7moveIdxhch))
 (export "_Z20createAroundIdxTablev" (func $_Z20createAroundIdxTablev))
 (export "_Z9aroundIdxhh" (func $_Z9aroundIdxhh))
 (export "_Z17getAroundIdxCounthh" (func $_Z17getAroundIdxCounthh))
 (export "_Z13setCBoardSizec" (func $_Z13setCBoardSizec))
 (export "main" (func $main))
 (func $_Z16createEmptyListsv (; 1 ;)
  (drop
   (call $memset
    (i32.const 64)
    (i32.const 225)
    (i32.const 4988)
   )
  )
 )
 (func $_Z14createIdxListsv (; 2 ;)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (set_local $7
   (i32.const 0)
  )
  (set_local $0
   (i32.load8_s offset=48
    (i32.const 0)
   )
  )
  (set_local $5
   (i32.const 78)
  )
  (set_local $3
   (i32.const 0)
  )
  (loop $label$0
   (set_local $8
    (i32.const 0)
   )
   (loop $label$1
    (block $label$2
     (br_if $label$2
      (i32.ge_s
       (get_local $8)
       (get_local $0)
      )
     )
     (br_if $label$2
      (i32.ge_s
       (get_local $3)
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $5)
       (get_local $8)
      )
      (i32.add
       (get_local $7)
       (get_local $8)
      )
     )
    )
    (br_if $label$1
     (i32.ne
      (tee_local $8
       (i32.add
        (get_local $8)
        (i32.const 1)
       )
      )
      (i32.const 15)
     )
    )
   )
   (set_local $5
    (i32.add
     (get_local $5)
     (i32.const 43)
    )
   )
   (set_local $7
    (i32.add
     (get_local $7)
     (i32.const 15)
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $3
      (i32.add
       (get_local $3)
       (i32.const 1)
      )
     )
     (i32.const 15)
    )
   )
  )
  (set_local $7
   (i32.const 0)
  )
  (set_local $5
   (i32.const 1325)
  )
  (loop $label$3
   (set_local $3
    (get_local $7)
   )
   (set_local $8
    (i32.const 0)
   )
   (loop $label$4
    (block $label$5
     (br_if $label$5
      (i32.ge_s
       (get_local $7)
       (get_local $0)
      )
     )
     (br_if $label$5
      (i32.ge_s
       (get_local $8)
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $5)
       (get_local $8)
      )
      (get_local $3)
     )
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 15)
     )
    )
    (br_if $label$4
     (i32.ne
      (tee_local $8
       (i32.add
        (get_local $8)
        (i32.const 1)
       )
      )
      (i32.const 15)
     )
    )
   )
   (set_local $5
    (i32.add
     (get_local $5)
     (i32.const 43)
    )
   )
   (br_if $label$3
    (i32.ne
     (tee_local $7
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
     )
     (i32.const 15)
    )
   )
  )
  (set_local $1
   (i32.const 0)
  )
  (set_local $2
   (i32.const 210)
  )
  (set_local $4
   (i32.const 2572)
  )
  (set_local $5
   (i32.const 14)
  )
  (set_local $7
   (i32.const 1)
  )
  (loop $label$6
   (set_local $3
    (get_local $2)
   )
   (set_local $8
    (i32.const 0)
   )
   (loop $label$7
    (block $label$8
     (br_if $label$8
      (i32.ge_s
       (get_local $8)
       (get_local $0)
      )
     )
     (br_if $label$8
      (i32.ge_s
       (i32.add
        (get_local $5)
        (get_local $8)
       )
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $4)
       (get_local $8)
      )
      (get_local $3)
     )
    )
    (set_local $3
     (i32.add
      (get_local $3)
      (i32.const 16)
     )
    )
    (br_if $label$7
     (i32.ne
      (get_local $7)
      (tee_local $8
       (i32.add
        (get_local $8)
        (i32.const 1)
       )
      )
     )
    )
   )
   (set_local $5
    (i32.add
     (get_local $5)
     (i32.const -1)
    )
   )
   (set_local $4
    (i32.add
     (get_local $4)
     (i32.const 43)
    )
   )
   (set_local $2
    (i32.add
     (get_local $2)
     (i32.const -15)
    )
   )
   (set_local $7
    (i32.add
     (get_local $7)
     (i32.const 1)
    )
   )
   (br_if $label$6
    (i32.ne
     (tee_local $1
      (i32.add
       (get_local $1)
       (i32.const 1)
      )
     )
     (i32.const 15)
    )
   )
  )
  (set_local $4
   (i32.const 0)
  )
  (set_local $5
   (i32.const 3819)
  )
  (loop $label$9
   (set_local $3
    (get_local $4)
   )
   (set_local $7
    (get_local $4)
   )
   (set_local $8
    (i32.const 0)
   )
   (loop $label$10
    (block $label$11
     (br_if $label$11
      (i32.ge_s
       (i32.and
        (get_local $3)
        (i32.const 255)
       )
       (get_local $0)
      )
     )
     (br_if $label$11
      (i32.ge_s
       (get_local $8)
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $5)
       (get_local $8)
      )
      (get_local $7)
     )
    )
    (set_local $7
     (i32.add
      (get_local $7)
      (i32.const 14)
     )
    )
    (set_local $8
     (i32.add
      (get_local $8)
      (i32.const 1)
     )
    )
    (br_if $label$10
     (i32.ne
      (tee_local $3
       (i32.add
        (get_local $3)
        (i32.const -1)
       )
      )
      (i32.const -1)
     )
    )
   )
   (set_local $5
    (i32.add
     (get_local $5)
     (i32.const 43)
    )
   )
   (br_if $label$9
    (i32.ne
     (tee_local $4
      (i32.add
       (get_local $4)
       (i32.const 1)
      )
     )
     (i32.const 15)
    )
   )
  )
  (set_local $6
   (i32.const 13)
  )
  (loop $label$12
   (set_local $2
    (i32.sub
     (i32.const 28)
     (tee_local $5
      (i32.and
       (get_local $6)
       (i32.const 255)
      )
     )
    )
   )
   (set_local $1
    (i32.add
     (i32.mul
      (i32.sub
       (i32.const 115)
       (get_local $5)
      )
      (i32.const 43)
     )
     (i32.const 64)
    )
   )
   (set_local $7
    (i32.const 0)
   )
   (set_local $8
    (i32.const 0)
   )
   (loop $label$13
    (block $label$14
     (br_if $label$14
      (i32.ge_s
       (tee_local $3
        (i32.and
         (i32.sub
          (i32.const 14)
          (get_local $8)
         )
         (i32.const 255)
        )
       )
       (get_local $0)
      )
     )
     (br_if $label$14
      (i32.ge_s
       (tee_local $4
        (i32.and
         (i32.sub
          (get_local $2)
          (get_local $3)
         )
         (i32.const 255)
        )
       )
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (i32.add
        (get_local $1)
        (get_local $7)
       )
       (i32.const 14)
      )
      (i32.add
       (i32.mul
        (get_local $4)
        (i32.const 15)
       )
       (get_local $3)
      )
     )
    )
    (br_if $label$13
     (i32.le_u
      (tee_local $7
       (i32.and
        (tee_local $8
         (i32.add
          (get_local $8)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
      )
      (get_local $5)
     )
    )
   )
   (set_local $6
    (i32.add
     (get_local $6)
     (i32.const -1)
    )
   )
   (br $label$12)
  )
 )
 (func $_Z14createIdxTablev (; 3 ;)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (local $15 i32)
  (local $16 i32)
  (local $17 i32)
  (local $18 i32)
  (local $19 i32)
  (local $20 i32)
  (local $21 i32)
  (local $22 i32)
  (local $23 i32)
  (set_local $17
   (i32.const 0)
  )
  (set_local $0
   (i32.load8_s offset=48
    (i32.const 0)
   )
  )
  (set_local $16
   (i32.const 5056)
  )
  (loop $label$0
   (set_local $8
    (select
     (tee_local $4
      (i32.add
       (tee_local $2
        (i32.div_u
         (tee_local $19
          (i32.and
           (get_local $17)
           (i32.const 255)
          )
         )
         (i32.const 15)
        )
       )
       (i32.const 14)
      )
     )
     (i32.sub
      (i32.const 28)
      (tee_local $1
       (i32.rem_u
        (get_local $19)
        (i32.const 15)
       )
      )
     )
     (i32.lt_u
      (tee_local $7
       (i32.add
        (get_local $2)
        (get_local $1)
       )
      )
      (i32.const 15)
     )
    )
   )
   (set_local $6
    (select
     (tee_local $3
      (i32.add
       (get_local $1)
       (i32.const 14)
      )
     )
     (get_local $4)
     (i32.lt_s
      (tee_local $5
       (i32.sub
        (get_local $3)
        (get_local $2)
       )
      )
      (i32.const 15)
     )
    )
   )
   (set_local $9
    (i32.or
     (i32.ge_s
      (get_local $1)
      (get_local $0)
     )
     (i32.ge_s
      (get_local $2)
      (get_local $0)
     )
    )
   )
   (set_local $11
    (i32.const -14)
   )
   (set_local $10
    (get_local $16)
   )
   (loop $label$1
    (set_local $15
     (i32.add
      (get_local $11)
      (get_local $8)
     )
    )
    (set_local $14
     (i32.add
      (get_local $11)
      (get_local $6)
     )
    )
    (set_local $13
     (i32.add
      (get_local $4)
      (get_local $11)
     )
    )
    (set_local $12
     (i32.add
      (get_local $3)
      (get_local $11)
     )
    )
    (set_local $18
     (i32.const 0)
    )
    (set_local $19
     (get_local $10)
    )
    (set_local $20
     (i32.const 0)
    )
    (loop $label$2
     (set_local $23
      (i32.const 225)
     )
     (block $label$3
      (block $label$4
       (br_if $label$4
        (get_local $9)
       )
       (br_if $label$3
        (i32.gt_u
         (tee_local $23
          (i32.and
           (get_local $20)
           (i32.const 255)
          )
         )
         (i32.const 3)
        )
       )
       (block $label$5
        (block $label$6
         (block $label$7
          (block $label$8
           (block $label$9
            (br_table $label$9 $label$8 $label$7 $label$6 $label$9
             (get_local $23)
            )
           )
           (set_local $23
            (i32.mul
             (get_local $20)
             (i32.const 29)
            )
           )
           (set_local $21
            (get_local $2)
           )
           (set_local $22
            (get_local $12)
           )
           (br $label$5)
          )
          (set_local $21
           (get_local $1)
          )
          (set_local $23
           (get_local $18)
          )
          (set_local $22
           (get_local $13)
          )
          (br $label$5)
         )
         (set_local $21
          (i32.mul
           (get_local $20)
           (i32.const 29)
          )
         )
         (set_local $23
          (get_local $5)
         )
         (set_local $22
          (get_local $14)
         )
         (br $label$5)
        )
        (set_local $21
         (get_local $18)
        )
        (set_local $23
         (get_local $7)
        )
        (set_local $22
         (get_local $15)
        )
       )
       (set_local $23
        (i32.load8_u
         (i32.add
          (i32.add
           (get_local $22)
           (i32.mul
            (i32.add
             (get_local $23)
             (get_local $21)
            )
            (i32.const 43)
           )
          )
          (i32.const 64)
         )
        )
       )
      )
      (i32.store16
       (get_local $19)
       (i32.and
        (get_local $23)
        (i32.const 255)
       )
      )
     )
     (set_local $18
      (i32.add
       (get_local $18)
       (i32.const 29)
      )
     )
     (set_local $19
      (i32.add
       (get_local $19)
       (i32.const 2)
      )
     )
     (br_if $label$2
      (i32.ne
       (tee_local $20
        (i32.add
         (get_local $20)
         (i32.const 1)
        )
       )
       (i32.const 4)
      )
     )
    )
    (set_local $10
     (i32.add
      (get_local $10)
      (i32.const 8)
     )
    )
    (br_if $label$1
     (i32.ne
      (tee_local $11
       (i32.add
        (get_local $11)
        (i32.const 1)
       )
      )
      (i32.const 15)
     )
    )
   )
   (set_local $16
    (i32.add
     (get_local $16)
     (i32.const 232)
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $17
      (i32.add
       (get_local $17)
       (i32.const 1)
      )
     )
     (i32.const 225)
    )
   )
  )
  (set_local $19
   (i32.const 115)
  )
  (loop $label$10
   (i32.store16
    (i32.add
     (i32.shl
      (i32.and
       (get_local $19)
       (i32.const 255)
      )
      (i32.const 1)
     )
     (i32.const 57256)
    )
    (i32.const 225)
   )
   (set_local $19
    (i32.add
     (get_local $19)
     (i32.const -1)
    )
   )
   (br $label$10)
  )
 )
 (func $_Z7moveIdxhch (; 4 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (i32.load8_u
   (i32.add
    (i32.shl
     (i32.add
      (get_local $2)
      (i32.shl
       (i32.add
        (i32.mul
         (get_local $0)
         (i32.const 29)
        )
        (get_local $1)
       )
       (i32.const 2)
      )
     )
     (i32.const 1)
    )
    (i32.const 5168)
   )
  )
 )
 (func $_Z20createAroundIdxTablev (; 5 ;)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (local $13 i32)
  (local $14 i32)
  (set_local $0
   (i32.load8_s offset=48
    (i32.const 0)
   )
  )
  (set_local $9
   (i32.const 57488)
  )
  (set_local $10
   (i32.const 0)
  )
  (loop $label$0
   (set_local $14
    (i32.const 30)
   )
   (set_local $4
    (call $memset
     (i32.add
      (i32.shl
       (tee_local $1
        (i32.mul
         (get_local $10)
         (i32.const 240)
        )
       )
       (i32.const 1)
      )
      (i32.const 57488)
     )
     (i32.const 0)
     (i32.const 30)
    )
   )
   (set_local $2
    (i32.or
     (get_local $1)
     (i32.const 15)
    )
   )
   (loop $label$1
    (i32.store16
     (i32.add
      (get_local $9)
      (get_local $14)
     )
     (i32.const 225)
    )
    (br_if $label$1
     (i32.ne
      (tee_local $14
       (i32.add
        (get_local $14)
        (i32.const 2)
       )
      )
      (i32.const 480)
     )
    )
   )
   (set_local $11
    (i32.div_u
     (tee_local $14
      (i32.and
       (get_local $10)
       (i32.const 255)
      )
     )
     (i32.const 15)
    )
   )
   (block $label$2
    (br_if $label$2
     (i32.ge_s
      (i32.rem_u
       (get_local $14)
       (i32.const 15)
      )
      (get_local $0)
     )
    )
    (br_if $label$2
     (i32.ge_s
      (get_local $11)
      (get_local $0)
     )
    )
    (set_local $11
     (i32.const 1)
    )
    (i32.store16
     (get_local $4)
     (i32.const 1)
    )
    (i32.store16
     (i32.add
      (i32.shl
       (get_local $2)
       (i32.const 1)
      )
      (i32.const 57488)
     )
     (get_local $10)
    )
    (set_local $3
     (i32.mul
      (get_local $10)
      (i32.const 29)
     )
    )
    (set_local $14
     (i32.const 1)
    )
    (loop $label$3
     (set_local $6
      (i32.load8_u
       (i32.add
        (tee_local $4
         (i32.shl
          (i32.add
           (get_local $3)
           (get_local $11)
          )
          (i32.const 3)
         )
        )
        (i32.const 5170)
       )
      )
     )
     (set_local $5
      (i32.load8_u
       (i32.add
        (get_local $4)
        (i32.const 5168)
       )
      )
     )
     (set_local $7
      (i32.load8_u
       (i32.add
        (tee_local $13
         (i32.shl
          (i32.add
           (i32.shr_s
            (i32.shl
             (tee_local $4
              (i32.sub
               (i32.const 0)
               (get_local $11)
              )
             )
             (i32.const 24)
            )
            (i32.const 24)
           )
           (get_local $3)
          )
          (i32.const 3)
         )
        )
        (i32.const 5168)
       )
      )
     )
     (block $label$4
      (br_if $label$4
       (i32.eq
        (tee_local $13
         (i32.load8_u
          (i32.add
           (get_local $13)
           (i32.const 5170)
          )
         )
        )
        (i32.const 225)
       )
      )
      (set_local $8
       (i32.mul
        (get_local $13)
        (i32.const 29)
       )
      )
      (set_local $12
       (i32.shr_s
        (i32.shl
         (tee_local $13
          (i32.sub
           (i32.const 1)
           (get_local $11)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$5
       (block $label$6
        (br_if $label$6
         (i32.eq
          (tee_local $12
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $12)
               (get_local $8)
              )
              (i32.const 3)
             )
             (i32.const 5168)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store16
         (i32.add
          (i32.shl
           (i32.add
            (get_local $2)
            (i32.and
             (get_local $14)
             (i32.const 255)
            )
           )
           (i32.const 1)
          )
          (i32.const 57488)
         )
         (get_local $12)
        )
        (set_local $14
         (i32.add
          (get_local $14)
          (i32.const 1)
         )
        )
       )
       (br_if $label$5
        (i32.ge_s
         (get_local $11)
         (tee_local $12
          (i32.shr_s
           (i32.shl
            (tee_local $13
             (i32.add
              (get_local $13)
              (i32.const 1)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
         )
        )
       )
      )
     )
     (block $label$7
      (br_if $label$7
       (i32.eq
        (get_local $5)
        (i32.const 225)
       )
      )
      (set_local $8
       (i32.mul
        (get_local $5)
        (i32.const 29)
       )
      )
      (set_local $12
       (i32.shr_s
        (i32.shl
         (tee_local $13
          (i32.sub
           (i32.const 1)
           (get_local $11)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$8
       (block $label$9
        (br_if $label$9
         (i32.eq
          (tee_local $12
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $12)
               (get_local $8)
              )
              (i32.const 3)
             )
             (i32.const 5170)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store16
         (i32.add
          (i32.shl
           (i32.add
            (get_local $2)
            (i32.and
             (get_local $14)
             (i32.const 255)
            )
           )
           (i32.const 1)
          )
          (i32.const 57488)
         )
         (get_local $12)
        )
        (set_local $14
         (i32.add
          (get_local $14)
          (i32.const 1)
         )
        )
       )
       (br_if $label$8
        (i32.ge_s
         (get_local $11)
         (tee_local $12
          (i32.shr_s
           (i32.shl
            (tee_local $13
             (i32.add
              (get_local $13)
              (i32.const 1)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
         )
        )
       )
      )
     )
     (block $label$10
      (br_if $label$10
       (i32.eq
        (get_local $6)
        (i32.const 225)
       )
      )
      (set_local $8
       (i32.mul
        (get_local $6)
        (i32.const 29)
       )
      )
      (set_local $12
       (i32.shr_s
        (i32.shl
         (tee_local $13
          (i32.add
           (get_local $11)
           (i32.const 255)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$11
       (block $label$12
        (br_if $label$12
         (i32.eq
          (tee_local $12
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $12)
               (get_local $8)
              )
              (i32.const 3)
             )
             (i32.const 5168)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store16
         (i32.add
          (i32.shl
           (i32.add
            (get_local $2)
            (i32.and
             (get_local $14)
             (i32.const 255)
            )
           )
           (i32.const 1)
          )
          (i32.const 57488)
         )
         (get_local $12)
        )
        (set_local $14
         (i32.add
          (get_local $14)
          (i32.const 1)
         )
        )
       )
       (br_if $label$11
        (i32.ge_s
         (tee_local $12
          (i32.shr_s
           (i32.shl
            (tee_local $13
             (i32.add
              (get_local $13)
              (i32.const -1)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
         )
         (get_local $4)
        )
       )
      )
     )
     (block $label$13
      (br_if $label$13
       (i32.eq
        (get_local $7)
        (i32.const 225)
       )
      )
      (set_local $8
       (i32.mul
        (get_local $7)
        (i32.const 29)
       )
      )
      (set_local $12
       (i32.shr_s
        (i32.shl
         (tee_local $13
          (i32.add
           (get_local $11)
           (i32.const 255)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$14
       (block $label$15
        (br_if $label$15
         (i32.eq
          (tee_local $12
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $12)
               (get_local $8)
              )
              (i32.const 3)
             )
             (i32.const 5170)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store16
         (i32.add
          (i32.shl
           (i32.add
            (get_local $2)
            (i32.and
             (get_local $14)
             (i32.const 255)
            )
           )
           (i32.const 1)
          )
          (i32.const 57488)
         )
         (get_local $12)
        )
        (set_local $14
         (i32.add
          (get_local $14)
          (i32.const 1)
         )
        )
       )
       (br_if $label$14
        (i32.ge_s
         (tee_local $12
          (i32.shr_s
           (i32.shl
            (tee_local $13
             (i32.add
              (get_local $13)
              (i32.const -1)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
         )
         (get_local $4)
        )
       )
      )
     )
     (i32.store16
      (i32.add
       (i32.shl
        (i32.add
         (get_local $11)
         (get_local $1)
        )
        (i32.const 1)
       )
       (i32.const 57488)
      )
      (i32.and
       (get_local $14)
       (i32.const 255)
      )
     )
     (br_if $label$3
      (i32.ne
       (tee_local $11
        (i32.add
         (get_local $11)
         (i32.const 1)
        )
       )
       (i32.const 15)
      )
     )
    )
   )
   (set_local $9
    (i32.add
     (get_local $9)
     (i32.const 480)
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $10
      (i32.add
       (get_local $10)
       (i32.const 1)
      )
     )
     (i32.const 225)
    )
   )
  )
 )
 (func $_Z9aroundIdxhh (; 6 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.load8_u
   (i32.add
    (i32.shl
     (i32.add
      (i32.or
       (i32.mul
        (get_local $0)
        (i32.const 240)
       )
       (i32.const 15)
      )
      (get_local $1)
     )
     (i32.const 1)
    )
    (i32.const 57488)
   )
  )
 )
 (func $_Z17getAroundIdxCounthh (; 7 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.load8_u
   (i32.add
    (i32.shl
     (i32.add
      (i32.mul
       (get_local $0)
       (i32.const 240)
      )
      (get_local $1)
     )
     (i32.const 1)
    )
    (i32.const 57488)
   )
  )
 )
 (func $_Z13setCBoardSizec (; 8 ;) (param $0 i32)
  (i32.store8 offset=48
   (i32.const 0)
   (get_local $0)
  )
  (call $_Z14createIdxListsv)
  (unreachable)
 )
 (func $main (; 9 ;) (result i32)
  (i32.store8 offset=48
   (i32.const 0)
   (i32.const 15)
  )
  (call $_Z14createIdxListsv)
  (unreachable)
 )
)
