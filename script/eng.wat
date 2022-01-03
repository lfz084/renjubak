(module
 (type $FUNCSIG$vd (func (param f64)))
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (import "env" "_Z3logd" (func $_Z3logd (param f64)))
 (import "env" "memset" (func $memset (param i32 i32 i32) (result i32)))
 (table 0 anyfunc)
 (memory $0 2)
 (data (i32.const 16) "\0f")
 (data (i32.const 32) "\02")
 (export "memory" (memory $0))
 (export "_Z9setBufferPhlh" (func $_Z9setBufferPhlh))
 (export "_Z9setBufferPtlt" (func $_Z9setBufferPtlt))
 (export "_Z16createEmptyListsv" (func $_Z16createEmptyListsv))
 (export "_Z14createIdxListsv" (func $_Z14createIdxListsv))
 (export "_Z14createIdxTablev" (func $_Z14createIdxTablev))
 (export "_Z7moveIdxhch" (func $_Z7moveIdxhch))
 (export "_Z11getArrValuehchPc" (func $_Z11getArrValuehchPc))
 (export "_Z20createAroundIdxTablev" (func $_Z20createAroundIdxTablev))
 (export "_Z9aroundIdxhh" (func $_Z9aroundIdxhh))
 (export "_Z17getAroundIdxCounthh" (func $_Z17getAroundIdxCounthh))
 (export "_Z4inithh" (func $_Z4inithh))
 (export "_Z8testLinehhcPc" (func $_Z8testLinehhcPc))
 (export "_Z12testLineFoulhhcPc" (func $_Z12testLineFoulhhcPc))
 (export "_Z12testLineFourhhcPc" (func $_Z12testLineFourhhcPc))
 (export "_Z13testLineThreehhcPc" (func $_Z13testLineThreehhcPc))
 (export "_Z17getBlockFourPointhPct" (func $_Z17getBlockFourPointhPct))
 (export "_Z19getBlockThreePointshPct" (func $_Z19getBlockThreePointshPct))
 (export "_Z16getFreeFourPointhPct" (func $_Z16getFreeFourPointhPct))
 (export "_Z6isFoulhPc" (func $_Z6isFoulhPc))
 (export "_Z8testFivePccPt" (func $_Z8testFivePccPt))
 (export "_Z8testFourPccPt" (func $_Z8testFourPccPt))
 (export "_Z9testThreePccPt" (func $_Z9testThreePccPt))
 (export "_Z8getLevelPcc" (func $_Z8getLevelPcc))
 (func $_Z9setBufferPhlh (; 2 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $1)
     (i32.const 1)
    )
   )
   (drop
    (call $memset
     (get_local $0)
     (get_local $2)
     (get_local $1)
    )
   )
  )
 )
 (func $_Z9setBufferPtlt (; 3 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $1)
     (i32.const 1)
    )
   )
   (loop $label$1
    (i32.store16
     (get_local $0)
     (get_local $2)
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 2)
     )
    )
    (br_if $label$1
     (tee_local $1
      (i32.add
       (get_local $1)
       (i32.const -1)
      )
     )
    )
   )
  )
 )
 (func $_Z16createEmptyListsv (; 4 ;)
  (drop
   (call $memset
    (i32.const 48)
    (i32.const 225)
    (i32.const 4988)
   )
  )
 )
 (func $_Z14createIdxListsv (; 5 ;)
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
  (set_local $7
   (i32.const 0)
  )
  (set_local $8
   (i32.const 76)
  )
  (set_local $14
   (i32.lt_u
    (tee_local $0
     (i32.load8_u offset=16
      (i32.const 0)
     )
    )
    (i32.const 3)
   )
  )
  (set_local $10
   (i32.lt_u
    (get_local $0)
    (i32.const 4)
   )
  )
  (set_local $12
   (i32.lt_u
    (get_local $0)
    (i32.const 5)
   )
  )
  (set_local $11
   (i32.lt_u
    (get_local $0)
    (i32.const 6)
   )
  )
  (set_local $13
   (i32.lt_u
    (get_local $0)
    (i32.const 7)
   )
  )
  (set_local $1
   (i32.lt_u
    (get_local $0)
    (i32.const 8)
   )
  )
  (set_local $2
   (i32.lt_u
    (get_local $0)
    (i32.const 9)
   )
  )
  (set_local $3
   (i32.lt_u
    (get_local $0)
    (i32.const 10)
   )
  )
  (set_local $4
   (i32.lt_u
    (get_local $0)
    (i32.const 11)
   )
  )
  (set_local $5
   (i32.lt_u
    (get_local $0)
    (i32.const 12)
   )
  )
  (set_local $6
   (i32.lt_u
    (get_local $0)
    (i32.const 13)
   )
  )
  (set_local $9
   (i32.const 14)
  )
  (loop $label$0
   (block $label$1
    (br_if $label$1
     (i32.ge_u
      (get_local $7)
      (get_local $0)
     )
    )
    (br_if $label$1
     (i32.eqz
      (get_local $0)
     )
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -14)
     )
     (i32.add
      (get_local $9)
      (i32.const -14)
     )
    )
    (br_if $label$1
     (i32.le_u
      (get_local $0)
      (i32.const 1)
     )
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -13)
     )
     (i32.add
      (get_local $9)
      (i32.const -13)
     )
    )
    (br_if $label$1
     (get_local $14)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -12)
     )
     (i32.add
      (get_local $9)
      (i32.const -12)
     )
    )
    (br_if $label$1
     (get_local $10)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -11)
     )
     (i32.add
      (get_local $9)
      (i32.const -11)
     )
    )
    (br_if $label$1
     (get_local $12)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -10)
     )
     (i32.add
      (get_local $9)
      (i32.const -10)
     )
    )
    (br_if $label$1
     (get_local $11)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -9)
     )
     (i32.add
      (get_local $9)
      (i32.const -9)
     )
    )
    (br_if $label$1
     (get_local $13)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -8)
     )
     (i32.add
      (get_local $9)
      (i32.const -8)
     )
    )
    (br_if $label$1
     (get_local $1)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -7)
     )
     (i32.add
      (get_local $9)
      (i32.const -7)
     )
    )
    (br_if $label$1
     (get_local $2)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -6)
     )
     (i32.add
      (get_local $9)
      (i32.const -6)
     )
    )
    (br_if $label$1
     (get_local $3)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -5)
     )
     (i32.add
      (get_local $9)
      (i32.const -5)
     )
    )
    (br_if $label$1
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -4)
     )
     (i32.add
      (get_local $9)
      (i32.const -4)
     )
    )
    (br_if $label$1
     (get_local $5)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -3)
     )
     (i32.add
      (get_local $9)
      (i32.const -3)
     )
    )
    (br_if $label$1
     (get_local $6)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -2)
     )
     (i32.add
      (get_local $9)
      (i32.const -2)
     )
    )
    (br_if $label$1
     (i32.lt_u
      (get_local $0)
      (i32.const 14)
     )
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -1)
     )
     (i32.add
      (get_local $9)
      (i32.const -1)
     )
    )
    (br_if $label$1
     (i32.lt_u
      (get_local $0)
      (i32.const 15)
     )
    )
    (i32.store8
     (get_local $8)
     (get_local $9)
    )
   )
   (set_local $8
    (i32.add
     (get_local $8)
     (i32.const 43)
    )
   )
   (set_local $7
    (i32.add
     (get_local $7)
     (i32.const 1)
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $9
      (i32.add
       (get_local $9)
       (i32.const 15)
      )
     )
     (i32.const 239)
    )
   )
  )
  (set_local $7
   (i32.const 0)
  )
  (set_local $8
   (i32.const 1323)
  )
  (set_local $9
   (i32.lt_u
    (get_local $0)
    (i32.const 3)
   )
  )
  (set_local $14
   (i32.lt_u
    (get_local $0)
    (i32.const 4)
   )
  )
  (set_local $10
   (i32.lt_u
    (get_local $0)
    (i32.const 5)
   )
  )
  (set_local $12
   (i32.lt_u
    (get_local $0)
    (i32.const 6)
   )
  )
  (set_local $11
   (i32.lt_u
    (get_local $0)
    (i32.const 7)
   )
  )
  (set_local $13
   (i32.lt_u
    (get_local $0)
    (i32.const 8)
   )
  )
  (set_local $1
   (i32.lt_u
    (get_local $0)
    (i32.const 9)
   )
  )
  (set_local $2
   (i32.lt_u
    (get_local $0)
    (i32.const 10)
   )
  )
  (set_local $3
   (i32.lt_u
    (get_local $0)
    (i32.const 11)
   )
  )
  (set_local $4
   (i32.lt_u
    (get_local $0)
    (i32.const 12)
   )
  )
  (set_local $5
   (i32.lt_u
    (get_local $0)
    (i32.const 13)
   )
  )
  (set_local $6
   (i32.lt_u
    (get_local $0)
    (i32.const 14)
   )
  )
  (loop $label$2
   (block $label$3
    (br_if $label$3
     (i32.ge_u
      (get_local $7)
      (get_local $0)
     )
    )
    (br_if $label$3
     (i32.eqz
      (get_local $0)
     )
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -14)
     )
     (get_local $7)
    )
    (br_if $label$3
     (i32.le_u
      (get_local $0)
      (i32.const 1)
     )
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -13)
     )
     (i32.add
      (get_local $7)
      (i32.const 15)
     )
    )
    (br_if $label$3
     (get_local $9)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -12)
     )
     (i32.add
      (get_local $7)
      (i32.const 30)
     )
    )
    (br_if $label$3
     (get_local $14)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -11)
     )
     (i32.add
      (get_local $7)
      (i32.const 45)
     )
    )
    (br_if $label$3
     (get_local $10)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -10)
     )
     (i32.add
      (get_local $7)
      (i32.const 60)
     )
    )
    (br_if $label$3
     (get_local $12)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -9)
     )
     (i32.add
      (get_local $7)
      (i32.const 75)
     )
    )
    (br_if $label$3
     (get_local $11)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -8)
     )
     (i32.add
      (get_local $7)
      (i32.const 90)
     )
    )
    (br_if $label$3
     (get_local $13)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -7)
     )
     (i32.add
      (get_local $7)
      (i32.const 105)
     )
    )
    (br_if $label$3
     (get_local $1)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -6)
     )
     (i32.add
      (get_local $7)
      (i32.const 120)
     )
    )
    (br_if $label$3
     (get_local $2)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -5)
     )
     (i32.add
      (get_local $7)
      (i32.const 135)
     )
    )
    (br_if $label$3
     (get_local $3)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -4)
     )
     (i32.add
      (get_local $7)
      (i32.const 150)
     )
    )
    (br_if $label$3
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -3)
     )
     (i32.add
      (get_local $7)
      (i32.const 165)
     )
    )
    (br_if $label$3
     (get_local $5)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -2)
     )
     (i32.add
      (get_local $7)
      (i32.const 180)
     )
    )
    (br_if $label$3
     (get_local $6)
    )
    (i32.store8
     (i32.add
      (get_local $8)
      (i32.const -1)
     )
     (i32.add
      (get_local $7)
      (i32.const 195)
     )
    )
    (br_if $label$3
     (i32.lt_u
      (get_local $0)
      (i32.const 15)
     )
    )
    (i32.store8
     (get_local $8)
     (i32.add
      (get_local $7)
      (i32.const 210)
     )
    )
   )
   (set_local $8
    (i32.add
     (get_local $8)
     (i32.const 43)
    )
   )
   (br_if $label$2
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
  (set_local $11
   (i32.const 0)
  )
  (set_local $12
   (i32.const 210)
  )
  (set_local $10
   (i32.const 2556)
  )
  (set_local $14
   (i32.const 14)
  )
  (set_local $9
   (i32.const 1)
  )
  (loop $label$4
   (set_local $8
    (get_local $12)
   )
   (set_local $7
    (i32.const 0)
   )
   (loop $label$5
    (block $label$6
     (br_if $label$6
      (i32.ge_u
       (get_local $7)
       (get_local $0)
      )
     )
     (br_if $label$6
      (i32.ge_u
       (i32.add
        (get_local $14)
        (get_local $7)
       )
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $10)
       (get_local $7)
      )
      (get_local $8)
     )
    )
    (set_local $8
     (i32.add
      (get_local $8)
      (i32.const 16)
     )
    )
    (br_if $label$5
     (i32.ne
      (get_local $9)
      (tee_local $7
       (i32.add
        (get_local $7)
        (i32.const 1)
       )
      )
     )
    )
   )
   (set_local $14
    (i32.add
     (get_local $14)
     (i32.const -1)
    )
   )
   (set_local $10
    (i32.add
     (get_local $10)
     (i32.const 43)
    )
   )
   (set_local $12
    (i32.add
     (get_local $12)
     (i32.const -15)
    )
   )
   (set_local $9
    (i32.add
     (get_local $9)
     (i32.const 1)
    )
   )
   (br_if $label$4
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
  (set_local $9
   (i32.const 0)
  )
  (set_local $14
   (i32.const 3760)
  )
  (set_local $10
   (i32.const 0)
  )
  (loop $label$7
   (set_local $8
    (i32.const 14)
   )
   (set_local $7
    (i32.const 0)
   )
   (loop $label$8
    (block $label$9
     (br_if $label$9
      (i32.ge_u
       (get_local $7)
       (get_local $0)
      )
     )
     (br_if $label$9
      (i32.ge_u
       (i32.add
        (i32.add
         (get_local $9)
         (get_local $7)
        )
        (i32.const 14)
       )
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $14)
       (get_local $7)
      )
      (i32.add
       (get_local $9)
       (get_local $8)
      )
     )
    )
    (set_local $8
     (i32.add
      (get_local $8)
      (i32.const 16)
     )
    )
    (br_if $label$8
     (i32.ne
      (i32.add
       (get_local $9)
       (tee_local $7
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
      )
      (i32.const 1)
     )
    )
   )
   (set_local $14
    (i32.add
     (get_local $14)
     (i32.const -43)
    )
   )
   (set_local $9
    (i32.add
     (get_local $9)
     (i32.const -1)
    )
   )
   (br_if $label$7
    (i32.ne
     (tee_local $10
      (i32.add
       (get_local $10)
       (i32.const 1)
      )
     )
     (i32.const 14)
    )
   )
  )
  (set_local $10
   (i32.const 0)
  )
  (set_local $14
   (i32.const 3803)
  )
  (loop $label$10
   (set_local $8
    (get_local $10)
   )
   (set_local $9
    (get_local $10)
   )
   (set_local $7
    (i32.const 0)
   )
   (loop $label$11
    (block $label$12
     (br_if $label$12
      (i32.ge_u
       (get_local $7)
       (get_local $0)
      )
     )
     (br_if $label$12
      (i32.ge_u
       (i32.and
        (get_local $8)
        (i32.const 255)
       )
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $14)
       (get_local $7)
      )
      (get_local $9)
     )
    )
    (set_local $9
     (i32.add
      (get_local $9)
      (i32.const 14)
     )
    )
    (set_local $7
     (i32.add
      (get_local $7)
      (i32.const 1)
     )
    )
    (br_if $label$11
     (i32.ne
      (tee_local $8
       (i32.add
        (get_local $8)
        (i32.const -1)
       )
      )
      (i32.const -1)
     )
    )
   )
   (set_local $14
    (i32.add
     (get_local $14)
     (i32.const 43)
    )
   )
   (br_if $label$10
    (i32.ne
     (tee_local $10
      (i32.add
       (get_local $10)
       (i32.const 1)
      )
     )
     (i32.const 15)
    )
   )
  )
  (set_local $13
   (i32.const 0)
  )
  (set_local $12
   (i32.const 5007)
  )
  (set_local $11
   (i32.const 224)
  )
  (set_local $10
   (i32.const 14)
  )
  (set_local $14
   (i32.const 1)
  )
  (loop $label$13
   (set_local $9
    (get_local $11)
   )
   (set_local $7
    (i32.const 14)
   )
   (set_local $8
    (i32.const 0)
   )
   (loop $label$14
    (block $label$15
     (br_if $label$15
      (i32.ge_u
       (get_local $7)
       (get_local $0)
      )
     )
     (br_if $label$15
      (i32.ge_u
       (i32.add
        (get_local $10)
        (get_local $8)
       )
       (get_local $0)
      )
     )
     (i32.store8
      (i32.add
       (get_local $12)
       (get_local $8)
      )
      (get_local $9)
     )
    )
    (set_local $9
     (i32.add
      (get_local $9)
      (i32.const 14)
     )
    )
    (set_local $7
     (i32.add
      (get_local $7)
      (i32.const -1)
     )
    )
    (br_if $label$14
     (i32.ne
      (get_local $14)
      (tee_local $8
       (i32.add
        (get_local $8)
        (i32.const 1)
       )
      )
     )
    )
   )
   (set_local $10
    (i32.add
     (get_local $10)
     (i32.const -1)
    )
   )
   (set_local $11
    (i32.add
     (get_local $11)
     (i32.const -15)
    )
   )
   (set_local $12
    (i32.add
     (get_local $12)
     (i32.const -43)
    )
   )
   (set_local $14
    (i32.add
     (get_local $14)
     (i32.const 1)
    )
   )
   (br_if $label$13
    (i32.ne
     (tee_local $13
      (i32.add
       (get_local $13)
       (i32.const 1)
      )
     )
     (i32.const 14)
    )
   )
  )
 )
 (func $_Z14createIdxTablev (; 6 ;)
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
  (set_local $9
   (i32.const 0)
  )
  (set_local $0
   (i32.load8_u offset=16
    (i32.const 0)
   )
  )
  (set_local $8
   (i32.const 5041)
  )
  (set_local $10
   (i32.const 0)
  )
  (loop $label$0
   (set_local $1
    (i32.div_u
     (tee_local $11
      (i32.and
       (get_local $10)
       (i32.const 255)
      )
     )
     (i32.const 15)
    )
   )
   (set_local $12
    (i32.div_u
     (i32.and
      (get_local $9)
      (i32.const 255)
     )
     (i32.const 15)
    )
   )
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.ge_u
       (tee_local $11
        (i32.rem_u
         (get_local $11)
         (i32.const 15)
        )
       )
       (tee_local $6
        (i32.and
         (get_local $0)
         (i32.const 255)
        )
       )
      )
     )
     (set_local $2
      (i32.add
       (i32.add
        (tee_local $4
         (i32.mul
          (get_local $12)
          (i32.const 43)
         )
        )
        (get_local $11)
       )
       (i32.const 48)
      )
     )
     (set_local $3
      (i32.add
       (i32.add
        (tee_local $7
         (i32.mul
          (get_local $11)
          (i32.const 43)
         )
        )
        (get_local $12)
       )
       (i32.const 1295)
      )
     )
     (set_local $5
      (i32.add
       (i32.add
        (i32.add
         (select
          (tee_local $12
           (i32.add
            (get_local $1)
            (i32.const 14)
           )
          )
          (i32.sub
           (i32.const 28)
           (get_local $11)
          )
          (i32.lt_u
           (i32.add
            (get_local $1)
            (get_local $11)
           )
           (i32.const 15)
          )
         )
         (get_local $7)
        )
        (get_local $4)
       )
       (i32.const 3775)
      )
     )
     (set_local $4
      (i32.add
       (i32.sub
        (i32.add
         (select
          (tee_local $11
           (i32.add
            (get_local $11)
            (i32.const 14)
           )
          )
          (get_local $12)
          (i32.lt_s
           (i32.sub
            (get_local $11)
            (get_local $1)
           )
           (i32.const 15)
          )
         )
         (get_local $7)
        )
        (get_local $4)
       )
       (i32.const 3130)
      )
     )
     (set_local $12
      (i32.const 0)
     )
     (set_local $11
      (get_local $8)
     )
     (loop $label$3
      (block $label$4
       (block $label$5
        (br_if $label$5
         (i32.ge_u
          (i32.and
           (get_local $1)
           (i32.const 255)
          )
          (get_local $6)
         )
        )
        (i32.store8
         (i32.add
          (get_local $11)
          (i32.const -1)
         )
         (i32.load8_u
          (i32.add
           (get_local $2)
           (get_local $12)
          )
         )
        )
        (i32.store8
         (get_local $11)
         (i32.load8_u
          (i32.add
           (get_local $3)
           (get_local $12)
          )
         )
        )
        (i32.store8
         (i32.add
          (get_local $11)
          (i32.const 1)
         )
         (i32.load8_u
          (i32.add
           (get_local $4)
           (get_local $12)
          )
         )
        )
        (i32.store8
         (i32.add
          (get_local $11)
          (i32.const 2)
         )
         (i32.load8_u
          (i32.add
           (get_local $5)
           (get_local $12)
          )
         )
        )
        (br $label$4)
       )
       (i32.store
        (i32.add
         (get_local $11)
         (i32.const -1)
        )
        (i32.const -505290271)
       )
      )
      (set_local $11
       (i32.add
        (get_local $11)
        (i32.const 4)
       )
      )
      (br_if $label$3
       (i32.ne
        (tee_local $12
         (i32.add
          (get_local $12)
          (i32.const 1)
         )
        )
        (i32.const 29)
       )
      )
      (br $label$1)
     )
    )
    (drop
     (call $memset
      (i32.add
       (i32.mul
        (get_local $10)
        (i32.const 116)
       )
       (i32.const 5040)
      )
      (i32.const 225)
      (i32.const 116)
     )
    )
   )
   (set_local $8
    (i32.add
     (get_local $8)
     (i32.const 116)
    )
   )
   (set_local $9
    (i32.add
     (get_local $9)
     (i32.const 1)
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
  (drop
   (call $memset
    (i32.const 31140)
    (i32.const 225)
    (i32.const 116)
   )
  )
 )
 (func $_Z7moveIdxhch (; 7 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (i32.load8_u
   (i32.add
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
    (i32.const 5096)
   )
  )
 )
 (func $_Z11getArrValuehchPc (; 8 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (i32.load8_s
   (i32.add
    (get_local $3)
    (i32.load8_u
     (i32.add
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
      (i32.const 5096)
     )
    )
   )
  )
 )
 (func $_Z20createAroundIdxTablev (; 9 ;)
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
  (set_local $0
   (i32.load8_u offset=16
    (i32.const 0)
   )
  )
  (set_local $9
   (i32.const 0)
  )
  (loop $label$0
   (i32.store8
    (i32.add
     (tee_local $1
      (i32.mul
       (get_local $9)
       (i32.const 240)
      )
     )
     (i32.const 31278)
    )
    (i32.const 0)
   )
   (i32.store16
    (i32.add
     (get_local $1)
     (i32.const 31276)
    )
    (i32.const 0)
   )
   (i32.store
    (i32.add
     (get_local $1)
     (i32.const 31272)
    )
    (i32.const 0)
   )
   (i64.store
    (tee_local $4
     (i32.add
      (get_local $1)
      (i32.const 31264)
     )
    )
    (i64.const 0)
   )
   (set_local $12
    (call $memset
     (i32.add
      (tee_local $2
       (i32.or
        (get_local $1)
        (i32.const 15)
       )
      )
      (i32.const 31264)
     )
     (i32.const 225)
     (i32.const 225)
    )
   )
   (set_local $10
    (i32.div_u
     (tee_local $13
      (i32.and
       (get_local $9)
       (i32.const 255)
      )
     )
     (i32.const 15)
    )
   )
   (block $label$1
    (br_if $label$1
     (i32.ge_u
      (i32.rem_u
       (get_local $13)
       (i32.const 15)
      )
      (tee_local $13
       (i32.and
        (get_local $0)
        (i32.const 255)
       )
      )
     )
    )
    (br_if $label$1
     (i32.ge_u
      (i32.and
       (get_local $10)
       (i32.const 255)
      )
      (get_local $13)
     )
    )
    (set_local $10
     (i32.const 1)
    )
    (i32.store8
     (get_local $4)
     (i32.const 1)
    )
    (i32.store8
     (get_local $12)
     (get_local $9)
    )
    (set_local $3
     (i32.mul
      (get_local $9)
      (i32.const 29)
     )
    )
    (set_local $13
     (i32.const 1)
    )
    (loop $label$2
     (set_local $6
      (i32.load8_u
       (i32.add
        (tee_local $4
         (i32.shl
          (i32.add
           (get_local $3)
           (get_local $10)
          )
          (i32.const 2)
         )
        )
        (i32.const 5097)
       )
      )
     )
     (set_local $5
      (i32.load8_u
       (i32.add
        (get_local $4)
        (i32.const 5096)
       )
      )
     )
     (set_local $7
      (i32.load8_u
       (i32.add
        (tee_local $12
         (i32.shl
          (i32.add
           (i32.shr_s
            (i32.shl
             (tee_local $4
              (i32.sub
               (i32.const 0)
               (get_local $10)
              )
             )
             (i32.const 24)
            )
            (i32.const 24)
           )
           (get_local $3)
          )
          (i32.const 2)
         )
        )
        (i32.const 5096)
       )
      )
     )
     (block $label$3
      (br_if $label$3
       (i32.eq
        (tee_local $12
         (i32.load8_u
          (i32.add
           (get_local $12)
           (i32.const 5097)
          )
         )
        )
        (i32.const 225)
       )
      )
      (set_local $8
       (i32.mul
        (get_local $12)
        (i32.const 29)
       )
      )
      (set_local $11
       (i32.shr_s
        (i32.shl
         (tee_local $12
          (i32.sub
           (i32.const 1)
           (get_local $10)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$4
       (block $label$5
        (br_if $label$5
         (i32.eq
          (tee_local $11
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $11)
               (get_local $8)
              )
              (i32.const 2)
             )
             (i32.const 5096)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store8
         (i32.add
          (i32.add
           (get_local $2)
           (i32.and
            (get_local $13)
            (i32.const 255)
           )
          )
          (i32.const 31264)
         )
         (get_local $11)
        )
        (set_local $13
         (i32.add
          (get_local $13)
          (i32.const 1)
         )
        )
       )
       (br_if $label$4
        (i32.ge_s
         (get_local $10)
         (tee_local $11
          (i32.shr_s
           (i32.shl
            (tee_local $12
             (i32.add
              (get_local $12)
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
     (block $label$6
      (br_if $label$6
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
      (set_local $11
       (i32.shr_s
        (i32.shl
         (tee_local $12
          (i32.sub
           (i32.const 1)
           (get_local $10)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$7
       (block $label$8
        (br_if $label$8
         (i32.eq
          (tee_local $11
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $11)
               (get_local $8)
              )
              (i32.const 2)
             )
             (i32.const 5097)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store8
         (i32.add
          (i32.add
           (get_local $2)
           (i32.and
            (get_local $13)
            (i32.const 255)
           )
          )
          (i32.const 31264)
         )
         (get_local $11)
        )
        (set_local $13
         (i32.add
          (get_local $13)
          (i32.const 1)
         )
        )
       )
       (br_if $label$7
        (i32.ge_s
         (get_local $10)
         (tee_local $11
          (i32.shr_s
           (i32.shl
            (tee_local $12
             (i32.add
              (get_local $12)
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
     (block $label$9
      (br_if $label$9
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
      (set_local $11
       (i32.shr_s
        (i32.shl
         (tee_local $12
          (i32.add
           (get_local $10)
           (i32.const 255)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$10
       (block $label$11
        (br_if $label$11
         (i32.eq
          (tee_local $11
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $11)
               (get_local $8)
              )
              (i32.const 2)
             )
             (i32.const 5096)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store8
         (i32.add
          (i32.add
           (get_local $2)
           (i32.and
            (get_local $13)
            (i32.const 255)
           )
          )
          (i32.const 31264)
         )
         (get_local $11)
        )
        (set_local $13
         (i32.add
          (get_local $13)
          (i32.const 1)
         )
        )
       )
       (br_if $label$10
        (i32.ge_s
         (tee_local $11
          (i32.shr_s
           (i32.shl
            (tee_local $12
             (i32.add
              (get_local $12)
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
     (block $label$12
      (br_if $label$12
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
      (set_local $11
       (i32.shr_s
        (i32.shl
         (tee_local $12
          (i32.add
           (get_local $10)
           (i32.const 255)
          )
         )
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (loop $label$13
       (block $label$14
        (br_if $label$14
         (i32.eq
          (tee_local $11
           (i32.load8_u
            (i32.add
             (i32.shl
              (i32.add
               (get_local $11)
               (get_local $8)
              )
              (i32.const 2)
             )
             (i32.const 5097)
            )
           )
          )
          (i32.const 225)
         )
        )
        (i32.store8
         (i32.add
          (i32.add
           (get_local $2)
           (i32.and
            (get_local $13)
            (i32.const 255)
           )
          )
          (i32.const 31264)
         )
         (get_local $11)
        )
        (set_local $13
         (i32.add
          (get_local $13)
          (i32.const 1)
         )
        )
       )
       (br_if $label$13
        (i32.ge_s
         (tee_local $11
          (i32.shr_s
           (i32.shl
            (tee_local $12
             (i32.add
              (get_local $12)
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
     (i32.store8
      (i32.add
       (i32.add
        (get_local $10)
        (get_local $1)
       )
       (i32.const 31264)
      )
      (get_local $13)
     )
     (br_if $label$2
      (i32.ne
       (tee_local $10
        (i32.add
         (get_local $10)
         (i32.const 1)
        )
       )
       (i32.const 15)
      )
     )
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $9
      (i32.add
       (get_local $9)
       (i32.const 1)
      )
     )
     (i32.const 225)
    )
   )
  )
 )
 (func $_Z9aroundIdxhh (; 10 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.load8_u
   (i32.add
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
    (i32.const 31264)
   )
  )
 )
 (func $_Z17getAroundIdxCounthh (; 11 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.load8_u
   (i32.add
    (i32.add
     (i32.mul
      (get_local $0)
      (i32.const 240)
     )
     (get_local $1)
    )
    (i32.const 31264)
   )
  )
 )
 (func $_Z4inithh (; 12 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.store8 offset=16
   (i32.const 0)
   (get_local $0)
  )
  (i32.store8 offset=32
   (i32.const 0)
   (get_local $1)
  )
  (drop
   (call $memset
    (i32.const 48)
    (i32.const 225)
    (i32.const 4988)
   )
  )
  (call $_Z14createIdxListsv)
  (call $_Z14createIdxTablev)
  (call $_Z20createAroundIdxTablev)
  (i32.const 1)
 )
 (func $_Z8testLinehhcPc (; 13 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
  (set_local $5
   (i32.load8_u
    (tee_local $4
     (i32.add
      (get_local $3)
      (get_local $0)
     )
    )
   )
  )
  (i32.store8
   (get_local $4)
   (get_local $2)
  )
  (i32.store8 offset=85264
   (i32.const 0)
   (i32.load8_u
    (i32.add
     (get_local $3)
     (i32.load8_u
      (i32.add
       (tee_local $0
        (i32.add
         (i32.mul
          (get_local $0)
          (i32.const 116)
         )
         (get_local $1)
        )
       )
       (i32.const 5076)
      )
     )
    )
   )
  )
  (i32.store8 offset=85265
   (i32.const 0)
   (tee_local $11
    (i32.load8_u
     (i32.add
      (get_local $3)
      (i32.load8_u
       (i32.add
        (get_local $0)
        (i32.const 5080)
       )
      )
     )
    )
   )
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.ne
      (get_local $2)
      (i32.const 1)
     )
    )
    (set_local $10
     (i32.add
      (get_local $0)
      (i32.const 5084)
     )
    )
    (set_local $0
     (i32.const -9)
    )
    (set_local $15
     (i32.const 255)
    )
    (set_local $19
     (i32.const 0)
    )
    (set_local $17
     (i32.const 0)
    )
    (set_local $18
     (i32.const 0)
    )
    (set_local $14
     (i32.const 0)
    )
    (set_local $13
     (i32.const 0)
    )
    (set_local $12
     (i32.const 0)
    )
    (set_local $8
     (i32.const 0)
    )
    (loop $label$2
     (i32.store8
      (i32.add
       (get_local $0)
       (i32.const 85275)
      )
      (tee_local $9
       (i32.load8_u
        (i32.add
         (get_local $3)
         (i32.load8_u
          (get_local $10)
         )
        )
       )
      )
     )
     (block $label$3
      (block $label$4
       (br_if $label$4
        (i32.eqz
         (tee_local $11
          (i32.and
           (get_local $11)
           (i32.const 255)
          )
         )
        )
       )
       (set_local $17
        (select
         (i32.add
          (get_local $17)
          (i32.const 1)
         )
         (i32.const 0)
         (tee_local $11
          (i32.eq
           (get_local $11)
           (i32.const 1)
          )
         )
        )
       )
       (set_local $18
        (select
         (get_local $18)
         (i32.const 0)
         (get_local $11)
        )
       )
       (br $label$3)
      )
      (set_local $18
       (i32.add
        (get_local $18)
        (i32.const 1)
       )
      )
     )
     (block $label$5
      (block $label$6
       (block $label$7
        (block $label$8
         (block $label$9
          (block $label$10
           (br_if $label$10
            (i32.ne
             (i32.add
              (tee_local $7
               (i32.and
                (get_local $17)
                (i32.const 255)
               )
              )
              (i32.and
               (get_local $18)
               (i32.const 255)
              )
             )
             (i32.const 5)
            )
           )
           (set_local $16
            (i32.add
             (get_local $0)
             (i32.const 5)
            )
           )
           (br_if $label$7
            (i32.ne
             (i32.load8_u offset=32
              (i32.const 0)
             )
             (i32.const 2)
            )
           )
           (br_if $label$9
            (i32.ne
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 85269)
              )
             )
             (i32.const 1)
            )
           )
           (set_local $11
            (get_local $9)
           )
           (br $label$8)
          )
          (set_local $11
           (get_local $9)
          )
          (br $label$5)
         )
         (set_local $11
          (i32.const 1)
         )
         (br_if $label$7
          (i32.ne
           (i32.and
            (get_local $9)
            (i32.const 255)
           )
           (i32.const 1)
          )
         )
        )
        (set_local $15
         (select
          (i32.const 28)
          (get_local $15)
          (tee_local $9
           (i32.and
            (i32.eq
             (get_local $7)
             (i32.const 5)
            )
            (i32.gt_s
             (get_local $7)
             (i32.shr_s
              (i32.shl
               (get_local $15)
               (i32.const 24)
              )
              (i32.const 24)
             )
            )
           )
          )
         )
        )
        (set_local $14
         (select
          (get_local $16)
          (get_local $14)
          (get_local $9)
         )
        )
        (set_local $13
         (select
          (i32.const 0)
          (get_local $13)
          (get_local $9)
         )
        )
        (set_local $12
         (select
          (i32.const 0)
          (get_local $12)
          (get_local $9)
         )
        )
        (br $label$6)
       )
       (set_local $19
        (select
         (i32.const 0)
         (get_local $19)
         (tee_local $11
          (i32.gt_s
           (get_local $7)
           (i32.shr_s
            (i32.shl
             (get_local $15)
             (i32.const 24)
            )
            (i32.const 24)
           )
          )
         )
        )
       )
       (set_local $14
        (select
         (get_local $16)
         (get_local $14)
         (get_local $11)
        )
       )
       (set_local $13
        (select
         (i32.const 0)
         (get_local $13)
         (get_local $11)
        )
       )
       (set_local $12
        (select
         (i32.const 0)
         (get_local $12)
         (get_local $11)
        )
       )
       (set_local $2
        (select
         (i32.const 1)
         (get_local $8)
         (get_local $11)
        )
       )
       (block $label$11
        (br_if $label$11
         (i32.ne
          (get_local $7)
          (i32.shr_s
           (i32.shl
            (tee_local $15
             (select
              (get_local $17)
              (get_local $15)
              (get_local $11)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
         )
        )
        (set_local $14
         (select
          (get_local $16)
          (get_local $14)
          (tee_local $11
           (i32.and
            (get_local $19)
            (i32.const 255)
           )
          )
         )
        )
        (set_local $8
         (i32.const 0)
        )
        (set_local $12
         (i32.add
          (get_local $12)
          (i32.ne
           (get_local $11)
           (i32.const 0)
          )
         )
        )
        (set_local $13
         (i32.add
          (get_local $13)
          (i32.ne
           (i32.and
            (get_local $2)
            (i32.const 255)
           )
           (i32.const 0)
          )
         )
        )
        (set_local $19
         (i32.const 1)
        )
        (set_local $11
         (get_local $9)
        )
        (br $label$6)
       )
       (set_local $11
        (get_local $9)
       )
       (set_local $8
        (get_local $2)
       )
      )
      (block $label$12
       (br_if $label$12
        (i32.eqz
         (i32.load8_u
          (i32.add
           (get_local $0)
           (i32.const 85270)
          )
         )
        )
       )
       (set_local $17
        (i32.add
         (get_local $17)
         (i32.const -1)
        )
       )
       (set_local $19
        (i32.const 0)
       )
       (br $label$5)
      )
      (set_local $18
       (i32.add
        (get_local $18)
        (i32.const -1)
       )
      )
      (set_local $8
       (i32.const 1)
      )
     )
     (set_local $10
      (i32.add
       (get_local $10)
       (i32.const 4)
      )
     )
     (br_if $label$2
      (tee_local $0
       (i32.add
        (get_local $0)
        (i32.const 1)
       )
      )
     )
     (br $label$0)
    )
   )
   (set_local $10
    (i32.add
     (get_local $0)
     (i32.const 5084)
    )
   )
   (set_local $0
    (i32.const -9)
   )
   (set_local $15
    (i32.const 255)
   )
   (set_local $19
    (i32.const 0)
   )
   (set_local $18
    (i32.const 0)
   )
   (set_local $17
    (i32.const 0)
   )
   (set_local $14
    (i32.const 0)
   )
   (set_local $13
    (i32.const 0)
   )
   (set_local $12
    (i32.const 0)
   )
   (set_local $16
    (i32.const 0)
   )
   (loop $label$13
    (set_local $9
     (get_local $11)
    )
    (i32.store8
     (i32.add
      (get_local $0)
      (i32.const 85275)
     )
     (tee_local $11
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.load8_u
         (get_local $10)
        )
       )
      )
     )
    )
    (block $label$14
     (block $label$15
      (br_if $label$15
       (i32.eqz
        (tee_local $9
         (i32.and
          (get_local $9)
          (i32.const 255)
         )
        )
       )
      )
      (set_local $18
       (select
        (i32.add
         (get_local $18)
         (i32.const 1)
        )
        (i32.const 0)
        (tee_local $9
         (i32.eq
          (get_local $9)
          (i32.and
           (get_local $2)
           (i32.const 255)
          )
         )
        )
       )
      )
      (set_local $17
       (select
        (get_local $17)
        (i32.const 0)
        (get_local $9)
       )
      )
      (br $label$14)
     )
     (set_local $17
      (i32.add
       (get_local $17)
       (i32.const 1)
      )
     )
    )
    (block $label$16
     (br_if $label$16
      (i32.ne
       (i32.add
        (tee_local $7
         (i32.and
          (get_local $18)
          (i32.const 255)
         )
        )
        (i32.and
         (get_local $17)
         (i32.const 255)
        )
       )
       (i32.const 5)
      )
     )
     (set_local $19
      (select
       (i32.const 0)
       (get_local $19)
       (tee_local $9
        (i32.gt_s
         (get_local $7)
         (i32.shr_s
          (i32.shl
           (get_local $15)
           (i32.const 24)
          )
          (i32.const 24)
         )
        )
       )
      )
     )
     (set_local $14
      (select
       (tee_local $6
        (i32.add
         (get_local $0)
         (i32.const 5)
        )
       )
       (get_local $14)
       (get_local $9)
      )
     )
     (set_local $13
      (select
       (i32.const 0)
       (get_local $13)
       (get_local $9)
      )
     )
     (set_local $12
      (select
       (i32.const 0)
       (get_local $12)
       (get_local $9)
      )
     )
     (set_local $8
      (select
       (i32.const 1)
       (get_local $16)
       (get_local $9)
      )
     )
     (block $label$17
      (block $label$18
       (br_if $label$18
        (i32.ne
         (get_local $7)
         (i32.shr_s
          (i32.shl
           (tee_local $15
            (select
             (get_local $18)
             (get_local $15)
             (get_local $9)
            )
           )
           (i32.const 24)
          )
          (i32.const 24)
         )
        )
       )
       (set_local $14
        (select
         (get_local $6)
         (get_local $14)
         (tee_local $9
          (i32.and
           (get_local $19)
           (i32.const 255)
          )
         )
        )
       )
       (set_local $16
        (i32.const 0)
       )
       (set_local $12
        (i32.add
         (get_local $12)
         (i32.ne
          (get_local $9)
          (i32.const 0)
         )
        )
       )
       (set_local $13
        (i32.add
         (get_local $13)
         (i32.ne
          (i32.and
           (get_local $8)
           (i32.const 255)
          )
          (i32.const 0)
         )
        )
       )
       (set_local $19
        (i32.const 1)
       )
       (br $label$17)
      )
      (set_local $16
       (get_local $8)
      )
     )
     (block $label$19
      (br_if $label$19
       (i32.eqz
        (i32.load8_u
         (i32.add
          (get_local $0)
          (i32.const 85270)
         )
        )
       )
      )
      (set_local $18
       (i32.add
        (get_local $18)
        (i32.const -1)
       )
      )
      (set_local $19
       (i32.const 0)
      )
      (br $label$16)
     )
     (set_local $17
      (i32.add
       (get_local $17)
       (i32.const -1)
      )
     )
     (set_local $16
      (i32.const 1)
     )
    )
    (set_local $10
     (i32.add
      (get_local $10)
      (i32.const 4)
     )
    )
    (br_if $label$13
     (tee_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
    )
   )
  )
  (i32.store8
   (get_local $4)
   (get_local $5)
  )
  (block $label$20
   (block $label$21
    (br_if $label$21
     (i32.eq
      (tee_local $11
       (i32.and
        (get_local $15)
        (i32.const 7)
       )
      )
      (i32.const 4)
     )
    )
    (set_local $0
     (i32.const 16)
    )
    (br_if $label$20
     (i32.eq
      (get_local $11)
      (i32.const 6)
     )
    )
    (set_local $0
     (i32.const 0)
    )
    (br $label$20)
   )
   (set_local $0
    (i32.const 0)
   )
   (br_if $label$20
    (i32.lt_u
     (i32.and
      (get_local $13)
      (i32.const 255)
     )
     (i32.const 2)
    )
   )
   (set_local $0
    (i32.shl
     (i32.eqz
      (i32.and
       (get_local $12)
       (i32.const 255)
      )
     )
     (i32.const 4)
    )
   )
  )
  (i32.and
   (i32.or
    (i32.or
     (i32.or
      (i32.or
       (i32.or
        (i32.shl
         (tee_local $11
          (i32.and
           (get_local $12)
           (i32.const 255)
          )
         )
         (i32.const 8)
        )
        (i32.shl
         (get_local $1)
         (i32.const 12)
        )
       )
       (i32.ne
        (get_local $11)
        (i32.const 0)
       )
      )
      (i32.shl
       (i32.and
        (get_local $14)
        (i32.const 255)
       )
       (i32.const 5)
      )
     )
     (i32.and
      (i32.shl
       (get_local $15)
       (i32.const 1)
      )
      (i32.const 14)
     )
    )
    (get_local $0)
   )
   (i32.const 65535)
  )
 )
 (func $_Z12testLineFoulhhcPc (; 14 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
  (set_local $5
   (i32.load8_u
    (tee_local $4
     (i32.add
      (get_local $3)
      (get_local $0)
     )
    )
   )
  )
  (i32.store8
   (get_local $4)
   (i32.const 1)
  )
  (set_local $19
   (i32.const 0)
  )
  (i32.store8 offset=85264
   (i32.const 0)
   (i32.load8_u
    (i32.add
     (get_local $3)
     (i32.load8_u
      (i32.add
       (tee_local $0
        (i32.add
         (i32.mul
          (get_local $0)
          (i32.const 116)
         )
         (get_local $1)
        )
       )
       (i32.const 5076)
      )
     )
    )
   )
  )
  (i32.store8 offset=85265
   (i32.const 0)
   (tee_local $16
    (i32.load8_u
     (i32.add
      (get_local $3)
      (i32.load8_u
       (i32.add
        (get_local $0)
        (i32.const 5080)
       )
      )
     )
    )
   )
  )
  (set_local $14
   (i32.add
    (get_local $0)
    (i32.const 5084)
   )
  )
  (set_local $15
   (i32.const -5)
  )
  (set_local $18
   (i32.const 0)
  )
  (set_local $17
   (i32.const 0)
  )
  (set_local $7
   (i32.const 0)
  )
  (set_local $8
   (i32.const 0)
  )
  (set_local $9
   (i32.const 0)
  )
  (set_local $10
   (i32.const 0)
  )
  (set_local $11
   (i32.const 0)
  )
  (block $label$0
   (loop $label$1
    (i32.store8
     (i32.add
      (tee_local $6
       (get_local $15)
      )
      (i32.const 85271)
     )
     (tee_local $12
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.load8_u
         (get_local $14)
        )
       )
      )
     )
    )
    (block $label$2
     (block $label$3
      (br_if $label$3
       (i32.eq
        (tee_local $15
         (i32.and
          (get_local $16)
          (i32.const 255)
         )
        )
        (i32.const 1)
       )
      )
      (set_local $0
       (i32.const 0)
      )
      (set_local $13
       (i32.const 0)
      )
      (br_if $label$2
       (get_local $15)
      )
      (set_local $0
       (i32.add
        (get_local $17)
        (i32.const 1)
       )
      )
      (set_local $13
       (get_local $18)
      )
      (br $label$2)
     )
     (set_local $13
      (i32.add
       (get_local $18)
       (i32.const 1)
      )
     )
     (set_local $0
      (get_local $17)
     )
    )
    (block $label$4
     (set_local $15
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (block $label$5
      (block $label$6
       (block $label$7
        (block $label$8
         (block $label$9
          (block $label$10
           (block $label$11
            (block $label$12
             (block $label$13
              (block $label$14
               (block $label$15
                (block $label$16
                 (br_if $label$16
                  (i32.ne
                   (i32.add
                    (tee_local $16
                     (i32.and
                      (get_local $13)
                      (i32.const 255)
                     )
                    )
                    (i32.and
                     (get_local $0)
                     (i32.const 255)
                    )
                   )
                   (i32.const 5)
                  )
                 )
                 (br_if $label$15
                  (i32.eq
                   (get_local $16)
                   (i32.const 3)
                  )
                 )
                 (br_if $label$14
                  (i32.eq
                   (get_local $16)
                   (i32.const 4)
                  )
                 )
                 (br_if $label$4
                  (i32.eq
                   (get_local $16)
                   (i32.const 5)
                  )
                 )
                 (set_local $17
                  (get_local $10)
                 )
                 (br $label$7)
                )
                (set_local $16
                 (get_local $12)
                )
                (set_local $17
                 (get_local $0)
                )
                (br $label$6)
               )
               (br_if $label$13
                (i32.gt_s
                 (tee_local $16
                  (i32.shr_s
                   (i32.shl
                    (get_local $19)
                    (i32.const 24)
                   )
                   (i32.const 24)
                  )
                 )
                 (i32.const 3)
                )
               )
               (br_if $label$11
                (i32.ne
                 (i32.load8_u
                  (i32.add
                   (get_local $6)
                   (i32.const 85265)
                  )
                 )
                 (i32.const 1)
                )
               )
               (set_local $17
                (get_local $10)
               )
               (br $label$7)
              )
              (br_if $label$12
               (i32.ne
                (i32.load8_u
                 (i32.add
                  (get_local $6)
                  (i32.const 85265)
                 )
                )
                (i32.const 1)
               )
              )
             )
             (set_local $17
              (get_local $10)
             )
             (br $label$7)
            )
            (br_if $label$10
             (i32.eq
              (i32.and
               (get_local $12)
               (i32.const 255)
              )
              (i32.const 1)
             )
            )
            (set_local $7
             (select
              (select
               (get_local $15)
               (get_local $7)
               (tee_local $16
                (i32.lt_s
                 (tee_local $18
                  (i32.shr_s
                   (i32.shl
                    (get_local $19)
                    (i32.const 24)
                   )
                   (i32.const 24)
                  )
                 )
                 (i32.const 4)
                )
               )
              )
              (get_local $15)
              (i32.or
               (i32.eqz
                (tee_local $11
                 (i32.and
                  (get_local $11)
                  (i32.const 255)
                 )
                )
               )
               (get_local $16)
              )
             )
            )
            (set_local $17
             (i32.const 0)
            )
            (set_local $9
             (i32.add
              (select
               (i32.const 0)
               (get_local $9)
               (get_local $16)
              )
              (i32.and
               (i32.ne
                (get_local $11)
                (i32.const 0)
               )
               (i32.gt_s
                (get_local $18)
                (i32.const 3)
               )
              )
             )
            )
            (set_local $8
             (i32.add
              (select
               (i32.const 0)
               (get_local $8)
               (get_local $16)
              )
              (i32.or
               (i32.ne
                (i32.and
                 (get_local $10)
                 (i32.const 255)
                )
                (i32.const 0)
               )
               (get_local $16)
              )
             )
            )
            (set_local $19
             (select
              (i32.const 4)
              (get_local $19)
              (get_local $16)
             )
            )
            (br $label$8)
           )
           (br_if $label$9
            (i32.ne
             (i32.and
              (get_local $12)
              (i32.const 255)
             )
             (i32.const 1)
            )
           )
          )
          (set_local $12
           (i32.const 1)
          )
          (set_local $17
           (get_local $10)
          )
          (br $label$7)
         )
         (set_local $19
          (i32.const 3)
         )
         (set_local $7
          (select
           (select
            (get_local $15)
            (get_local $7)
            (tee_local $18
             (i32.lt_s
              (get_local $16)
              (i32.const 3)
             )
            )
           )
           (get_local $15)
           (i32.or
            (i32.eqz
             (tee_local $11
              (i32.and
               (get_local $11)
               (i32.const 255)
              )
             )
            )
            (get_local $18)
           )
          )
         )
         (set_local $17
          (i32.const 0)
         )
         (set_local $9
          (i32.add
           (select
            (i32.const 0)
            (get_local $9)
            (get_local $18)
           )
           (i32.and
            (i32.ne
             (get_local $11)
             (i32.const 0)
            )
            (i32.gt_s
             (get_local $16)
             (i32.const 2)
            )
           )
          )
         )
         (set_local $8
          (i32.add
           (select
            (i32.const 0)
            (get_local $8)
            (get_local $18)
           )
           (i32.or
            (i32.ne
             (i32.and
              (get_local $10)
              (i32.const 255)
             )
             (i32.const 0)
            )
            (get_local $18)
           )
          )
         )
        )
        (set_local $11
         (i32.const 1)
        )
       )
       (block $label$17
        (br_if $label$17
         (i32.eqz
          (i32.load8_u
           (i32.add
            (get_local $6)
            (i32.const 85266)
           )
          )
         )
        )
        (set_local $18
         (i32.add
          (get_local $13)
          (i32.const -1)
         )
        )
        (set_local $11
         (i32.const 0)
        )
        (set_local $16
         (get_local $12)
        )
        (set_local $10
         (get_local $17)
        )
        (set_local $17
         (get_local $0)
        )
        (br $label$5)
       )
       (set_local $17
        (i32.add
         (get_local $0)
         (i32.const -1)
        )
       )
       (set_local $10
        (i32.const 1)
       )
       (set_local $16
        (get_local $12)
       )
      )
      (set_local $18
       (get_local $13)
      )
     )
     (set_local $14
      (i32.add
       (get_local $14)
       (i32.const 4)
      )
     )
     (br_if $label$1
      (i32.lt_s
       (get_local $15)
       (i32.const 4)
      )
     )
     (br $label$0)
    )
   )
   (set_local $7
    (i32.add
     (get_local $6)
     (i32.const 1)
    )
   )
   (set_local $19
    (i32.const 28)
   )
   (set_local $9
    (i32.const 0)
   )
   (block $label$18
    (br_if $label$18
     (i32.eq
      (i32.load8_u
       (i32.add
        (get_local $6)
        (i32.const 85265)
       )
      )
      (i32.const 1)
     )
    )
    (set_local $19
     (select
      (i32.const 28)
      (i32.const 5)
      (i32.eq
       (i32.and
        (get_local $12)
        (i32.const 255)
       )
       (i32.const 1)
      )
     )
    )
   )
   (set_local $8
    (i32.const 0)
   )
  )
  (i32.store8
   (get_local $4)
   (get_local $5)
  )
  (set_local $13
   (i32.or
    (i32.or
     (i32.shl
      (tee_local $0
       (i32.and
        (get_local $9)
        (i32.const 255)
       )
      )
      (i32.const 8)
     )
     (i32.shl
      (get_local $1)
      (i32.const 12)
     )
    )
    (i32.shl
     (i32.and
      (get_local $7)
      (i32.const 255)
     )
     (i32.const 5)
    )
   )
  )
  (block $label$19
   (block $label$20
    (br_if $label$20
     (i32.eqz
      (get_local $0)
     )
    )
    (set_local $0
     (select
      (i32.const 9)
      (i32.const 7)
      (i32.eq
       (i32.and
        (get_local $19)
        (i32.const 255)
       )
       (i32.const 4)
      )
     )
    )
    (br $label$19)
   )
   (set_local $0
    (select
     (select
      (i32.const 24)
      (tee_local $0
       (i32.shl
        (i32.shr_s
         (i32.shl
          (get_local $19)
          (i32.const 24)
         )
         (i32.const 24)
        )
        (i32.const 1)
       )
      )
      (i32.eq
       (i32.and
        (get_local $19)
        (i32.const 255)
       )
       (i32.const 4)
      )
     )
     (get_local $0)
     (i32.gt_u
      (i32.and
       (get_local $8)
       (i32.const 255)
      )
      (i32.const 1)
     )
    )
   )
  )
  (i32.and
   (i32.or
    (get_local $13)
    (get_local $0)
   )
   (i32.const 65535)
  )
 )
 (func $_Z12testLineFourhhcPc (; 15 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
  (set_local $5
   (i32.load8_u
    (tee_local $4
     (i32.add
      (get_local $3)
      (get_local $0)
     )
    )
   )
  )
  (i32.store8
   (get_local $4)
   (get_local $2)
  )
  (set_local $7
   (i32.add
    (get_local $1)
    (i32.const 56)
   )
  )
  (set_local $6
   (i32.mul
    (get_local $0)
    (i32.const 29)
   )
  )
  (block $label$0
   (block $label$1
    (block $label$2
     (block $label$3
      (block $label$4
       (block $label$5
        (block $label$6
         (br_if $label$6
          (i32.eqz
           (tee_local $8
            (i32.and
             (i32.eq
              (get_local $2)
              (i32.const 1)
             )
             (i32.eq
              (i32.load8_u offset=32
               (i32.const 0)
              )
              (i32.const 2)
             )
            )
           )
          )
         )
         (set_local $10
          (i32.add
           (i32.add
            (i32.mul
             (get_local $0)
             (i32.const 116)
            )
            (get_local $1)
           )
           (i32.const 5080)
          )
         )
         (set_local $12
          (i32.const -4)
         )
         (set_local $17
          (i32.const -5)
         )
         (set_local $11
          (i32.const -67108864)
         )
         (set_local $21
          (i32.const 0)
         )
         (set_local $15
          (i32.const 0)
         )
         (set_local $0
          (i32.const 0)
         )
         (set_local $20
          (i32.const 0)
         )
         (set_local $19
          (i32.const 0)
         )
         (set_local $18
          (i32.const 0)
         )
         (set_local $14
          (i32.const 0)
         )
         (set_local $16
          (i32.const 0)
         )
         (loop $label$7
          (set_local $9
           (get_local $17)
          )
          (block $label$8
           (block $label$9
            (br_if $label$9
             (i32.eqz
              (tee_local $17
               (i32.load8_u
                (i32.add
                 (get_local $3)
                 (i32.load8_u
                  (get_local $10)
                 )
                )
               )
              )
             )
            )
            (set_local $15
             (select
              (i32.add
               (get_local $15)
               (i32.const 1)
              )
              (i32.const 0)
              (tee_local $17
               (i32.eq
                (get_local $17)
                (i32.const 1)
               )
              )
             )
            )
            (set_local $0
             (select
              (get_local $0)
              (i32.const 0)
              (get_local $17)
             )
            )
            (br $label$8)
           )
           (set_local $0
            (i32.add
             (get_local $0)
             (i32.const 1)
            )
           )
          )
          (set_local $17
           (i32.add
            (get_local $9)
            (i32.const 1)
           )
          )
          (block $label$10
           (br_if $label$10
            (i32.ne
             (i32.add
              (tee_local $2
               (i32.and
                (get_local $15)
                (i32.const 255)
               )
              )
              (i32.and
               (get_local $0)
               (i32.const 255)
              )
             )
             (i32.const 5)
            )
           )
           (block $label$11
            (block $label$12
             (br_if $label$12
              (i32.eq
               (get_local $2)
               (i32.const 4)
              )
             )
             (set_local $13
              (get_local $11)
             )
             (br_if $label$11
              (i32.ne
               (get_local $2)
               (i32.const 5)
              )
             )
             (br $label$5)
            )
            (set_local $13
             (i32.shl
              (get_local $12)
              (i32.const 24)
             )
            )
            (br_if $label$11
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $3)
                (i32.load8_u
                 (i32.add
                  (i32.add
                   (i32.shl
                    (i32.add
                     (i32.shr_s
                      (i32.add
                       (get_local $11)
                       (i32.const -83886080)
                      )
                      (i32.const 24)
                     )
                     (get_local $6)
                    )
                    (i32.const 2)
                   )
                   (get_local $7)
                  )
                  (i32.const 5040)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (br_if $label$11
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $3)
                (i32.load8_u
                 (i32.add
                  (i32.add
                   (i32.shl
                    (i32.add
                     (i32.shr_s
                      (i32.add
                       (get_local $11)
                       (i32.const 16777216)
                      )
                      (i32.const 24)
                     )
                     (get_local $6)
                    )
                    (i32.const 2)
                   )
                   (get_local $7)
                  )
                  (i32.const 5040)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (set_local $20
             (select
              (select
               (get_local $17)
               (get_local $20)
               (tee_local $9
                (i32.lt_s
                 (tee_local $2
                  (i32.shr_s
                   (i32.shl
                    (get_local $21)
                    (i32.const 24)
                   )
                   (i32.const 24)
                  )
                 )
                 (i32.const 4)
                )
               )
              )
              (get_local $17)
              (i32.or
               (i32.eqz
                (tee_local $16
                 (i32.and
                  (get_local $16)
                  (i32.const 255)
                 )
                )
               )
               (get_local $9)
              )
             )
            )
            (set_local $18
             (i32.add
              (select
               (i32.const 0)
               (get_local $18)
               (get_local $9)
              )
              (i32.and
               (i32.ne
                (get_local $16)
                (i32.const 0)
               )
               (i32.gt_s
                (get_local $2)
                (i32.const 3)
               )
              )
             )
            )
            (set_local $19
             (i32.add
              (select
               (i32.const 0)
               (get_local $19)
               (get_local $9)
              )
              (i32.or
               (i32.ne
                (i32.and
                 (get_local $14)
                 (i32.const 255)
                )
                (i32.const 0)
               )
               (get_local $9)
              )
             )
            )
            (set_local $21
             (select
              (i32.const 4)
              (get_local $21)
              (get_local $9)
             )
            )
            (set_local $16
             (i32.const 1)
            )
            (set_local $14
             (i32.const 0)
            )
           )
           (block $label$13
            (br_if $label$13
             (i32.eqz
              (i32.load8_u
               (i32.add
                (get_local $3)
                (i32.load8_u
                 (i32.add
                  (i32.add
                   (i32.shl
                    (i32.add
                     (i32.shr_s
                      (i32.add
                       (get_local $13)
                       (i32.const -67108864)
                      )
                      (i32.const 24)
                     )
                     (get_local $6)
                    )
                    (i32.const 2)
                   )
                   (get_local $7)
                  )
                  (i32.const 5040)
                 )
                )
               )
              )
             )
            )
            (set_local $15
             (i32.add
              (get_local $15)
              (i32.const -1)
             )
            )
            (set_local $16
             (i32.const 0)
            )
            (br $label$10)
           )
           (set_local $0
            (i32.add
             (get_local $0)
             (i32.const -1)
            )
           )
           (set_local $14
            (i32.const 1)
           )
          )
          (set_local $10
           (i32.add
            (get_local $10)
            (i32.const 4)
           )
          )
          (set_local $11
           (i32.add
            (get_local $11)
            (i32.const 16777216)
           )
          )
          (set_local $12
           (i32.add
            (get_local $12)
            (i32.const 1)
           )
          )
          (br_if $label$7
           (i32.lt_s
            (get_local $17)
            (i32.const 4)
           )
          )
          (br $label$0)
         )
        )
        (set_local $10
         (i32.add
          (i32.add
           (i32.mul
            (get_local $0)
            (i32.const 116)
           )
           (get_local $1)
          )
          (i32.const 5080)
         )
        )
        (set_local $0
         (i32.const -5)
        )
        (set_local $11
         (i32.const -134217728)
        )
        (set_local $21
         (i32.const 0)
        )
        (set_local $15
         (i32.const 0)
        )
        (set_local $17
         (i32.const 0)
        )
        (set_local $20
         (i32.const 0)
        )
        (set_local $19
         (i32.const 0)
        )
        (set_local $18
         (i32.const 0)
        )
        (set_local $16
         (i32.const 0)
        )
        (set_local $13
         (i32.const 0)
        )
        (loop $label$14
         (set_local $12
          (get_local $0)
         )
         (block $label$15
          (block $label$16
           (br_if $label$16
            (i32.eqz
             (tee_local $0
              (i32.load8_u
               (i32.add
                (get_local $3)
                (i32.load8_u
                 (get_local $10)
                )
               )
              )
             )
            )
           )
           (set_local $15
            (select
             (i32.add
              (get_local $15)
              (i32.const 1)
             )
             (i32.const 0)
             (tee_local $0
              (i32.eq
               (get_local $0)
               (i32.and
                (get_local $2)
                (i32.const 255)
               )
              )
             )
            )
           )
           (set_local $17
            (select
             (get_local $17)
             (i32.const 0)
             (get_local $0)
            )
           )
           (br $label$15)
          )
          (set_local $17
           (i32.add
            (get_local $17)
            (i32.const 1)
           )
          )
         )
         (set_local $0
          (i32.add
           (get_local $12)
           (i32.const 1)
          )
         )
         (block $label$17
          (br_if $label$17
           (i32.ne
            (i32.add
             (tee_local $9
              (i32.and
               (get_local $15)
               (i32.const 255)
              )
             )
             (i32.and
              (get_local $17)
              (i32.const 255)
             )
            )
            (i32.const 5)
           )
          )
          (block $label$18
           (block $label$19
            (br_if $label$19
             (i32.eq
              (get_local $9)
              (i32.const 4)
             )
            )
            (br_if $label$18
             (i32.ne
              (get_local $9)
              (i32.const 5)
             )
            )
            (br $label$4)
           )
           (set_local $20
            (select
             (select
              (get_local $0)
              (get_local $20)
              (tee_local $12
               (i32.lt_s
                (tee_local $9
                 (i32.shr_s
                  (i32.shl
                   (get_local $21)
                   (i32.const 24)
                  )
                  (i32.const 24)
                 )
                )
                (i32.const 4)
               )
              )
             )
             (get_local $0)
             (i32.or
              (i32.eqz
               (tee_local $13
                (i32.and
                 (get_local $13)
                 (i32.const 255)
                )
               )
              )
              (get_local $12)
             )
            )
           )
           (set_local $18
            (i32.add
             (select
              (i32.const 0)
              (get_local $18)
              (get_local $12)
             )
             (i32.and
              (i32.ne
               (get_local $13)
               (i32.const 0)
              )
              (i32.gt_s
               (get_local $9)
               (i32.const 3)
              )
             )
            )
           )
           (set_local $19
            (i32.add
             (select
              (i32.const 0)
              (get_local $19)
              (get_local $12)
             )
             (i32.or
              (i32.ne
               (i32.and
                (get_local $16)
                (i32.const 255)
               )
               (i32.const 0)
              )
              (get_local $12)
             )
            )
           )
           (set_local $21
            (select
             (i32.const 4)
             (get_local $21)
             (get_local $12)
            )
           )
           (set_local $13
            (i32.const 1)
           )
           (set_local $16
            (i32.const 0)
           )
          )
          (block $label$20
           (br_if $label$20
            (i32.eqz
             (i32.load8_u
              (i32.add
               (get_local $3)
               (i32.load8_u
                (i32.add
                 (i32.add
                  (i32.shl
                   (i32.add
                    (i32.shr_s
                     (get_local $11)
                     (i32.const 24)
                    )
                    (get_local $6)
                   )
                   (i32.const 2)
                  )
                  (get_local $7)
                 )
                 (i32.const 5040)
                )
               )
              )
             )
            )
           )
           (set_local $15
            (i32.add
             (get_local $15)
             (i32.const -1)
            )
           )
           (set_local $13
            (i32.const 0)
           )
           (br $label$17)
          )
          (set_local $17
           (i32.add
            (get_local $17)
            (i32.const -1)
           )
          )
          (set_local $16
           (i32.const 1)
          )
         )
         (set_local $11
          (i32.add
           (get_local $11)
           (i32.const 16777216)
          )
         )
         (set_local $10
          (i32.add
           (get_local $10)
           (i32.const 4)
          )
         )
         (br_if $label$14
          (i32.lt_s
           (get_local $0)
           (i32.const 4)
          )
         )
         (br $label$0)
        )
       )
       (set_local $20
        (i32.add
         (get_local $9)
         (i32.const 1)
        )
       )
       (br_if $label$3
        (get_local $8)
       )
       (br $label$2)
      )
      (set_local $20
       (i32.add
        (get_local $12)
        (i32.const 1)
       )
      )
      (br_if $label$2
       (i32.eqz
        (get_local $8)
       )
      )
     )
     (set_local $21
      (i32.const 28)
     )
     (set_local $18
      (i32.const 0)
     )
     (br_if $label$1
      (i32.eq
       (i32.load8_u
        (i32.add
         (get_local $3)
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (tee_local $0
                 (i32.shl
                  (get_local $20)
                  (i32.const 24)
                 )
                )
                (i32.const -83886080)
               )
               (i32.const 24)
              )
              (get_local $6)
             )
             (i32.const 2)
            )
            (get_local $7)
           )
           (i32.const 5040)
          )
         )
        )
       )
       (i32.const 1)
      )
     )
     (set_local $19
      (i32.const 0)
     )
     (br_if $label$0
      (i32.eq
       (i32.load8_u
        (i32.add
         (get_local $3)
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (get_local $0)
                (i32.const 16777216)
               )
               (i32.const 24)
              )
              (get_local $6)
             )
             (i32.const 2)
            )
            (get_local $7)
           )
           (i32.const 5040)
          )
         )
        )
       )
       (i32.const 1)
      )
     )
    )
    (set_local $21
     (i32.const 5)
    )
    (set_local $18
     (i32.const 0)
    )
   )
   (set_local $19
    (i32.const 0)
   )
  )
  (i32.store8
   (get_local $4)
   (get_local $5)
  )
  (set_local $17
   (i32.or
    (i32.or
     (i32.shl
      (tee_local $0
       (i32.and
        (get_local $18)
        (i32.const 255)
       )
      )
      (i32.const 8)
     )
     (i32.shl
      (get_local $1)
      (i32.const 12)
     )
    )
    (i32.shl
     (i32.and
      (get_local $20)
      (i32.const 255)
     )
     (i32.const 5)
    )
   )
  )
  (set_local $3
   (i32.const 9)
  )
  (block $label$21
   (br_if $label$21
    (get_local $0)
   )
   (set_local $3
    (i32.const 24)
   )
   (br_if $label$21
    (i32.gt_u
     (i32.and
      (get_local $19)
      (i32.const 255)
     )
     (i32.const 1)
    )
   )
   (set_local $3
    (i32.shl
     (i32.shr_s
      (i32.shl
       (get_local $21)
       (i32.const 24)
      )
      (i32.const 24)
     )
     (i32.const 1)
    )
   )
  )
  (i32.and
   (i32.or
    (get_local $17)
    (get_local $3)
   )
   (i32.const 65535)
  )
 )
 (func $_Z13testLineThreehhcPc (; 16 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
  (set_local $5
   (i32.load8_u
    (tee_local $4
     (i32.add
      (get_local $3)
      (get_local $0)
     )
    )
   )
  )
  (i32.store8
   (get_local $4)
   (get_local $2)
  )
  (i32.store8 offset=85264
   (i32.const 0)
   (i32.load8_u
    (i32.add
     (get_local $3)
     (i32.load8_u
      (i32.add
       (tee_local $14
        (i32.add
         (i32.mul
          (get_local $0)
          (i32.const 116)
         )
         (get_local $1)
        )
       )
       (i32.const 5076)
      )
     )
    )
   )
  )
  (i32.store8 offset=85265
   (i32.const 0)
   (tee_local $0
    (i32.load8_u
     (i32.add
      (get_local $3)
      (i32.load8_u
       (i32.add
        (get_local $14)
        (i32.const 5080)
       )
      )
     )
    )
   )
  )
  (block $label$0
   (block $label$1
    (block $label$2
     (block $label$3
      (block $label$4
       (br_if $label$4
        (i32.ne
         (get_local $2)
         (i32.const 1)
        )
       )
       (set_local $10
        (i32.add
         (get_local $14)
         (i32.const 5084)
        )
       )
       (set_local $15
        (i32.const -5)
       )
       (set_local $19
        (i32.const 0)
       )
       (set_local $13
        (i32.const 0)
       )
       (set_local $14
        (i32.const 0)
       )
       (set_local $18
        (i32.const 0)
       )
       (set_local $17
        (i32.const 0)
       )
       (set_local $16
        (i32.const 0)
       )
       (set_local $7
        (i32.const 0)
       )
       (set_local $8
        (i32.const 0)
       )
       (loop $label$5
        (i32.store8
         (i32.add
          (tee_local $6
           (get_local $15)
          )
          (i32.const 85271)
         )
         (tee_local $11
          (i32.load8_u
           (i32.add
            (get_local $3)
            (i32.load8_u
             (get_local $10)
            )
           )
          )
         )
        )
        (block $label$6
         (block $label$7
          (br_if $label$7
           (i32.eqz
            (tee_local $0
             (i32.and
              (get_local $0)
              (i32.const 255)
             )
            )
           )
          )
          (set_local $13
           (select
            (i32.add
             (get_local $13)
             (i32.const 1)
            )
            (i32.const 0)
            (tee_local $0
             (i32.eq
              (get_local $0)
              (i32.const 1)
             )
            )
           )
          )
          (set_local $14
           (select
            (get_local $14)
            (i32.const 0)
            (get_local $0)
           )
          )
          (br $label$6)
         )
         (set_local $14
          (i32.add
           (get_local $14)
           (i32.const 1)
          )
         )
        )
        (set_local $15
         (i32.add
          (get_local $6)
          (i32.const 1)
         )
        )
        (block $label$8
         (block $label$9
          (br_if $label$9
           (i32.ne
            (i32.add
             (tee_local $0
              (i32.and
               (get_local $13)
               (i32.const 255)
              )
             )
             (i32.and
              (get_local $14)
              (i32.const 255)
             )
            )
            (i32.const 5)
           )
          )
          (block $label$10
           (block $label$11
            (block $label$12
             (block $label$13
              (block $label$14
               (block $label$15
                (block $label$16
                 (block $label$17
                  (block $label$18
                   (block $label$19
                    (br_if $label$19
                     (i32.eq
                      (get_local $0)
                      (i32.const 3)
                     )
                    )
                    (br_if $label$18
                     (i32.eq
                      (get_local $0)
                      (i32.const 4)
                     )
                    )
                    (br_if $label$3
                     (i32.eq
                      (get_local $0)
                      (i32.const 5)
                     )
                    )
                    (set_local $12
                     (get_local $7)
                    )
                    (br $label$10)
                   )
                   (br_if $label$17
                    (i32.gt_s
                     (tee_local $0
                      (i32.shr_s
                       (i32.shl
                        (get_local $19)
                        (i32.const 24)
                       )
                       (i32.const 24)
                      )
                     )
                     (i32.const 3)
                    )
                   )
                   (br_if $label$12
                    (i32.ne
                     (i32.load8_u offset=32
                      (i32.const 0)
                     )
                     (i32.const 2)
                    )
                   )
                   (br_if $label$14
                    (i32.ne
                     (i32.load8_u
                      (i32.add
                       (get_local $6)
                       (i32.const 85265)
                      )
                     )
                     (i32.const 1)
                    )
                   )
                   (set_local $12
                    (get_local $7)
                   )
                   (br $label$10)
                  )
                  (br_if $label$15
                   (i32.ne
                    (i32.load8_u offset=32
                     (i32.const 0)
                    )
                    (i32.const 2)
                   )
                  )
                  (br_if $label$16
                   (i32.ne
                    (i32.load8_u
                     (i32.add
                      (get_local $6)
                      (i32.const 85265)
                     )
                    )
                    (i32.const 1)
                   )
                  )
                 )
                 (set_local $12
                  (get_local $7)
                 )
                 (br $label$10)
                )
                (br_if $label$13
                 (i32.eq
                  (i32.and
                   (get_local $11)
                   (i32.const 255)
                  )
                  (i32.const 1)
                 )
                )
               )
               (set_local $18
                (select
                 (select
                  (get_local $15)
                  (get_local $18)
                  (tee_local $0
                   (i32.lt_s
                    (tee_local $9
                     (i32.shr_s
                      (i32.shl
                       (get_local $19)
                       (i32.const 24)
                      )
                      (i32.const 24)
                     )
                    )
                    (i32.const 4)
                   )
                  )
                 )
                 (get_local $15)
                 (i32.or
                  (i32.eqz
                   (tee_local $8
                    (i32.and
                     (get_local $8)
                     (i32.const 255)
                    )
                   )
                  )
                  (get_local $0)
                 )
                )
               )
               (set_local $12
                (i32.const 0)
               )
               (set_local $16
                (i32.add
                 (select
                  (i32.const 0)
                  (get_local $16)
                  (get_local $0)
                 )
                 (i32.and
                  (i32.ne
                   (get_local $8)
                   (i32.const 0)
                  )
                  (i32.gt_s
                   (get_local $9)
                   (i32.const 3)
                  )
                 )
                )
               )
               (set_local $17
                (i32.add
                 (select
                  (i32.const 0)
                  (get_local $17)
                  (get_local $0)
                 )
                 (i32.or
                  (i32.ne
                   (i32.and
                    (get_local $7)
                    (i32.const 255)
                   )
                   (i32.const 0)
                  )
                  (get_local $0)
                 )
                )
               )
               (set_local $19
                (select
                 (i32.const 4)
                 (get_local $19)
                 (get_local $0)
                )
               )
               (br $label$11)
              )
              (br_if $label$12
               (i32.ne
                (i32.and
                 (get_local $11)
                 (i32.const 255)
                )
                (i32.const 1)
               )
              )
             )
             (set_local $11
              (i32.const 1)
             )
             (set_local $12
              (get_local $7)
             )
             (br $label$10)
            )
            (set_local $19
             (i32.const 3)
            )
            (set_local $18
             (select
              (select
               (get_local $15)
               (get_local $18)
               (tee_local $9
                (i32.lt_s
                 (get_local $0)
                 (i32.const 3)
                )
               )
              )
              (get_local $15)
              (i32.or
               (i32.eqz
                (tee_local $8
                 (i32.and
                  (get_local $8)
                  (i32.const 255)
                 )
                )
               )
               (get_local $9)
              )
             )
            )
            (set_local $12
             (i32.const 0)
            )
            (set_local $16
             (i32.add
              (select
               (i32.const 0)
               (get_local $16)
               (get_local $9)
              )
              (i32.and
               (i32.ne
                (get_local $8)
                (i32.const 0)
               )
               (i32.gt_s
                (get_local $0)
                (i32.const 2)
               )
              )
             )
            )
            (set_local $17
             (i32.add
              (select
               (i32.const 0)
               (get_local $17)
               (get_local $9)
              )
              (i32.or
               (i32.ne
                (i32.and
                 (get_local $7)
                 (i32.const 255)
                )
                (i32.const 0)
               )
               (get_local $9)
              )
             )
            )
           )
           (set_local $8
            (i32.const 1)
           )
          )
          (block $label$20
           (br_if $label$20
            (i32.eqz
             (i32.load8_u
              (i32.add
               (get_local $6)
               (i32.const 85266)
              )
             )
            )
           )
           (set_local $13
            (i32.add
             (get_local $13)
             (i32.const -1)
            )
           )
           (set_local $8
            (i32.const 0)
           )
           (set_local $0
            (get_local $11)
           )
           (set_local $7
            (get_local $12)
           )
           (br $label$8)
          )
          (set_local $14
           (i32.add
            (get_local $14)
            (i32.const -1)
           )
          )
          (set_local $7
           (i32.const 1)
          )
         )
         (set_local $0
          (get_local $11)
         )
        )
        (set_local $10
         (i32.add
          (get_local $10)
          (i32.const 4)
         )
        )
        (br_if $label$5
         (i32.lt_s
          (get_local $15)
          (i32.const 4)
         )
        )
        (br $label$0)
       )
      )
      (set_local $10
       (i32.add
        (get_local $14)
        (i32.const 5084)
       )
      )
      (set_local $14
       (i32.const -5)
      )
      (set_local $19
       (i32.const 0)
      )
      (set_local $13
       (i32.const 0)
      )
      (set_local $15
       (i32.const 0)
      )
      (set_local $18
       (i32.const 0)
      )
      (set_local $17
       (i32.const 0)
      )
      (set_local $16
       (i32.const 0)
      )
      (set_local $12
       (i32.const 0)
      )
      (set_local $7
       (i32.const 0)
      )
      (loop $label$21
       (set_local $11
        (get_local $0)
       )
       (i32.store8
        (i32.add
         (tee_local $6
          (get_local $14)
         )
         (i32.const 85271)
        )
        (tee_local $0
         (i32.load8_u
          (i32.add
           (get_local $3)
           (i32.load8_u
            (get_local $10)
           )
          )
         )
        )
       )
       (block $label$22
        (block $label$23
         (br_if $label$23
          (i32.eqz
           (tee_local $14
            (i32.and
             (get_local $11)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $13
          (select
           (i32.add
            (get_local $13)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $14
            (i32.eq
             (get_local $14)
             (i32.and
              (get_local $2)
              (i32.const 255)
             )
            )
           )
          )
         )
         (set_local $15
          (select
           (get_local $15)
           (i32.const 0)
           (get_local $14)
          )
         )
         (br $label$22)
        )
        (set_local $15
         (i32.add
          (get_local $15)
          (i32.const 1)
         )
        )
       )
       (set_local $14
        (i32.add
         (get_local $6)
         (i32.const 1)
        )
       )
       (block $label$24
        (br_if $label$24
         (i32.ne
          (i32.add
           (tee_local $11
            (i32.and
             (get_local $13)
             (i32.const 255)
            )
           )
           (i32.and
            (get_local $15)
            (i32.const 255)
           )
          )
          (i32.const 5)
         )
        )
        (block $label$25
         (block $label$26
          (block $label$27
           (block $label$28
            (br_if $label$28
             (i32.eq
              (get_local $11)
              (i32.const 3)
             )
            )
            (br_if $label$27
             (i32.eq
              (get_local $11)
              (i32.const 4)
             )
            )
            (br_if $label$25
             (i32.ne
              (get_local $11)
              (i32.const 5)
             )
            )
            (br $label$2)
           )
           (br_if $label$25
            (i32.gt_s
             (i32.shr_s
              (i32.shl
               (get_local $19)
               (i32.const 24)
              )
              (i32.const 24)
             )
             (i32.const 3)
            )
           )
           (set_local $8
            (i32.and
             (get_local $19)
             (i32.const 255)
            )
           )
           (set_local $19
            (i32.const 3)
           )
           (set_local $18
            (select
             (select
              (get_local $14)
              (get_local $18)
              (tee_local $11
               (i32.ne
                (get_local $8)
                (i32.const 3)
               )
              )
             )
             (get_local $14)
             (i32.or
              (i32.eqz
               (tee_local $7
                (i32.and
                 (get_local $7)
                 (i32.const 255)
                )
               )
              )
              (get_local $11)
             )
            )
           )
           (set_local $16
            (i32.add
             (select
              (i32.const 0)
              (get_local $16)
              (get_local $11)
             )
             (i32.and
              (i32.ne
               (get_local $7)
               (i32.const 0)
              )
              (i32.eq
               (get_local $8)
               (i32.const 3)
              )
             )
            )
           )
           (set_local $17
            (i32.add
             (select
              (i32.const 0)
              (get_local $17)
              (get_local $11)
             )
             (i32.or
              (i32.ne
               (i32.and
                (get_local $12)
                (i32.const 255)
               )
               (i32.const 0)
              )
              (get_local $11)
             )
            )
           )
           (br $label$26)
          )
          (set_local $18
           (select
            (select
             (get_local $14)
             (get_local $18)
             (tee_local $11
              (i32.lt_s
               (tee_local $8
                (i32.shr_s
                 (i32.shl
                  (get_local $19)
                  (i32.const 24)
                 )
                 (i32.const 24)
                )
               )
               (i32.const 4)
              )
             )
            )
            (get_local $14)
            (i32.or
             (i32.eqz
              (tee_local $7
               (i32.and
                (get_local $7)
                (i32.const 255)
               )
              )
             )
             (get_local $11)
            )
           )
          )
          (set_local $16
           (i32.add
            (select
             (i32.const 0)
             (get_local $16)
             (get_local $11)
            )
            (i32.and
             (i32.ne
              (get_local $7)
              (i32.const 0)
             )
             (i32.gt_s
              (get_local $8)
              (i32.const 3)
             )
            )
           )
          )
          (set_local $17
           (i32.add
            (select
             (i32.const 0)
             (get_local $17)
             (get_local $11)
            )
            (i32.or
             (i32.ne
              (i32.and
               (get_local $12)
               (i32.const 255)
              )
              (i32.const 0)
             )
             (get_local $11)
            )
           )
          )
          (set_local $19
           (select
            (i32.const 4)
            (get_local $19)
            (get_local $11)
           )
          )
         )
         (set_local $7
          (i32.const 1)
         )
         (set_local $12
          (i32.const 0)
         )
        )
        (block $label$29
         (br_if $label$29
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $6)
             (i32.const 85266)
            )
           )
          )
         )
         (set_local $13
          (i32.add
           (get_local $13)
           (i32.const -1)
          )
         )
         (set_local $7
          (i32.const 0)
         )
         (br $label$24)
        )
        (set_local $15
         (i32.add
          (get_local $15)
          (i32.const -1)
         )
        )
        (set_local $12
         (i32.const 1)
        )
       )
       (set_local $10
        (i32.add
         (get_local $10)
         (i32.const 4)
        )
       )
       (br_if $label$21
        (i32.lt_s
         (get_local $14)
         (i32.const 4)
        )
       )
       (br $label$0)
      )
     )
     (set_local $18
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br $label$1)
    )
    (set_local $18
     (i32.add
      (get_local $6)
      (i32.const 1)
     )
    )
    (set_local $11
     (get_local $0)
    )
   )
   (set_local $16
    (i32.const 0)
   )
   (block $label$30
    (block $label$31
     (br_if $label$31
      (i32.ne
       (get_local $2)
       (i32.const 1)
      )
     )
     (br_if $label$31
      (i32.ne
       (i32.and
        (i32.load8_u offset=32
         (i32.const 0)
        )
        (i32.const 255)
       )
       (i32.const 2)
      )
     )
     (set_local $19
      (i32.const 28)
     )
     (br_if $label$30
      (i32.eq
       (i32.load8_u
        (i32.add
         (get_local $18)
         (i32.const 85264)
        )
       )
       (i32.const 1)
      )
     )
     (br_if $label$30
      (i32.eq
       (i32.and
        (get_local $11)
        (i32.const 255)
       )
       (i32.const 1)
      )
     )
    )
    (set_local $19
     (i32.const 5)
    )
   )
   (set_local $17
    (i32.const 0)
   )
  )
  (i32.store8
   (get_local $4)
   (get_local $5)
  )
  (set_local $14
   (i32.or
    (i32.or
     (i32.shl
      (tee_local $0
       (i32.and
        (get_local $16)
        (i32.const 255)
       )
      )
      (i32.const 8)
     )
     (i32.shl
      (get_local $1)
      (i32.const 12)
     )
    )
    (i32.shl
     (i32.and
      (get_local $18)
      (i32.const 255)
     )
     (i32.const 5)
    )
   )
  )
  (block $label$32
   (block $label$33
    (br_if $label$33
     (i32.eqz
      (get_local $0)
     )
    )
    (set_local $0
     (select
      (i32.const 9)
      (i32.const 7)
      (i32.eq
       (i32.and
        (get_local $19)
        (i32.const 255)
       )
       (i32.const 4)
      )
     )
    )
    (br $label$32)
   )
   (set_local $0
    (select
     (select
      (i32.const 24)
      (tee_local $0
       (i32.shl
        (i32.shr_s
         (i32.shl
          (get_local $19)
          (i32.const 24)
         )
         (i32.const 24)
        )
        (i32.const 1)
       )
      )
      (i32.eq
       (i32.and
        (get_local $19)
        (i32.const 255)
       )
       (i32.const 4)
      )
     )
     (get_local $0)
     (i32.gt_u
      (i32.and
       (get_local $17)
       (i32.const 255)
      )
      (i32.const 1)
     )
    )
   )
  )
  (i32.and
   (i32.or
    (get_local $14)
    (get_local $0)
   )
   (i32.const 65535)
  )
 )
 (func $_Z17getBlockFourPointhPct (; 17 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (i32.load8_u
      (i32.add
       (get_local $1)
       (tee_local $2
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (tee_local $3
              (i32.and
               (i32.shr_u
                (get_local $2)
                (i32.const 5)
               )
               (i32.const 7)
              )
             )
             (tee_local $0
              (i32.mul
               (get_local $0)
               (i32.const 29)
              )
             )
            )
            (i32.const 2)
           )
           (tee_local $4
            (i32.or
             (i32.shr_u
              (get_local $2)
              (i32.const 12)
             )
             (i32.const 56)
            )
           )
          )
          (i32.const 5040)
         )
        )
       )
      )
     )
    )
   )
   (br_if $label$0
    (i32.eqz
     (i32.load8_u
      (i32.add
       (get_local $1)
       (tee_local $2
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (tee_local $5
                (i32.shl
                 (get_local $3)
                 (i32.const 24)
                )
               )
               (i32.const -16777216)
              )
              (i32.const 24)
             )
             (get_local $0)
            )
            (i32.const 2)
           )
           (get_local $4)
          )
          (i32.const 5040)
         )
        )
       )
      )
     )
    )
   )
   (br_if $label$0
    (i32.eqz
     (i32.load8_u
      (i32.add
       (get_local $1)
       (tee_local $2
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (get_local $5)
               (i32.const -33554432)
              )
              (i32.const 24)
             )
             (get_local $0)
            )
            (i32.const 2)
           )
           (get_local $4)
          )
          (i32.const 5040)
         )
        )
       )
      )
     )
    )
   )
   (br_if $label$0
    (i32.eqz
     (i32.load8_u
      (i32.add
       (get_local $1)
       (tee_local $2
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (tee_local $3
                (i32.shl
                 (get_local $3)
                 (i32.const 24)
                )
               )
               (i32.const -50331648)
              )
              (i32.const 24)
             )
             (get_local $0)
            )
            (i32.const 2)
           )
           (get_local $4)
          )
          (i32.const 5040)
         )
        )
       )
      )
     )
    )
   )
   (return
    (i32.and
     (select
      (i32.const -31)
      (tee_local $2
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.add
              (get_local $3)
              (i32.const -67108864)
             )
             (i32.const 24)
            )
            (get_local $0)
           )
           (i32.const 2)
          )
          (get_local $4)
         )
         (i32.const 5040)
        )
       )
      )
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $2)
       )
      )
     )
     (i32.const 255)
    )
   )
  )
  (get_local $2)
 )
 (func $_Z19getBlockThreePointshPct (; 18 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (i32.store offset=85712
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $5
   (i32.shr_u
    (get_local $2)
    (i32.const 12)
   )
  )
  (set_local $3
   (i32.and
    (i32.shr_u
     (get_local $2)
     (i32.const 5)
    )
    (i32.const 7)
   )
  )
  (set_local $4
   (i32.const 1)
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eq
      (tee_local $2
       (i32.and
        (i32.shr_u
         (get_local $2)
         (i32.const 8)
        )
        (i32.const 7)
       )
      )
      (i32.const 1)
     )
    )
    (br_if $label$0
     (i32.ne
      (get_local $2)
      (i32.const 2)
     )
    )
    (set_local $5
     (i32.or
      (get_local $5)
      (i32.const 56)
     )
    )
    (set_local $4
     (i32.mul
      (get_local $0)
      (i32.const 29)
     )
    )
    (set_local $0
     (i32.const 0)
    )
    (loop $label$2
     (br_if $label$0
      (i32.lt_s
       (i32.shr_s
        (i32.shl
         (get_local $0)
         (i32.const 24)
        )
        (i32.const 24)
       )
       (i32.const -4)
      )
     )
     (set_local $6
      (i32.add
       (get_local $3)
       (get_local $0)
      )
     )
     (set_local $0
      (tee_local $2
       (i32.add
        (get_local $0)
        (i32.const -1)
       )
      )
     )
     (br_if $label$2
      (i32.load8_u
       (i32.add
        (get_local $1)
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.shl
               (get_local $6)
               (i32.const 24)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 5040)
         )
        )
       )
      )
     )
    )
    (loop $label$3
     (block $label$4
      (br_if $label$4
       (i32.load8_u
        (i32.add
         (get_local $1)
         (tee_local $0
          (i32.load8_u
           (i32.add
            (i32.add
             (i32.shl
              (i32.add
               (i32.shr_s
                (i32.shl
                 (i32.add
                  (get_local $3)
                  (get_local $2)
                 )
                 (i32.const 24)
                )
                (i32.const 24)
               )
               (get_local $4)
              )
              (i32.const 2)
             )
             (get_local $5)
            )
            (i32.const 5040)
           )
          )
         )
        )
       )
      )
      (i32.store8 offset=85712
       (i32.const 0)
       (tee_local $6
        (i32.add
         (i32.load8_u offset=85712
          (i32.const 0)
         )
         (i32.const 1)
        )
       )
      )
      (i32.store8
       (i32.add
        (i32.and
         (get_local $6)
         (i32.const 255)
        )
        (i32.const 85712)
       )
       (get_local $0)
      )
     )
     (set_local $0
      (i32.shl
       (get_local $2)
       (i32.const 24)
      )
     )
     (set_local $2
      (i32.add
       (get_local $2)
       (i32.const -1)
      )
     )
     (br_if $label$3
      (i32.gt_s
       (i32.shr_s
        (get_local $0)
        (i32.const 24)
       )
       (i32.const -5)
      )
     )
     (br $label$0)
    )
   )
   (block $label$5
    (br_if $label$5
     (i32.load8_u
      (i32.add
       (get_local $1)
       (tee_local $5
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (get_local $3)
             (tee_local $2
              (i32.mul
               (get_local $0)
               (i32.const 29)
              )
             )
            )
            (i32.const 2)
           )
           (tee_local $0
            (i32.or
             (get_local $5)
             (i32.const 56)
            )
           )
          )
          (i32.const 5040)
         )
        )
       )
      )
     )
    )
    (i32.store8 offset=85713
     (i32.const 0)
     (get_local $5)
    )
    (i32.store8 offset=85712
     (i32.const 0)
     (i32.const 1)
    )
    (set_local $4
     (i32.const 2)
    )
   )
   (block $label$6
    (br_if $label$6
     (i32.load8_u
      (i32.add
       (get_local $1)
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (tee_local $5
                (i32.shl
                 (get_local $3)
                 (i32.const 24)
                )
               )
               (i32.const -16777216)
              )
              (i32.const 24)
             )
             (get_local $2)
            )
            (i32.const 2)
           )
           (get_local $0)
          )
          (i32.const 5040)
         )
        )
       )
      )
     )
    )
    (i32.store8 offset=85712
     (i32.const 0)
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $4)
       (i32.const 255)
      )
      (i32.const 85712)
     )
     (get_local $6)
    )
   )
   (block $label$7
    (br_if $label$7
     (i32.load8_u
      (i32.add
       (get_local $1)
       (tee_local $5
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (get_local $5)
               (i32.const -33554432)
              )
              (i32.const 24)
             )
             (get_local $2)
            )
            (i32.const 2)
           )
           (get_local $0)
          )
          (i32.const 5040)
         )
        )
       )
      )
     )
    )
    (i32.store8 offset=85712
     (i32.const 0)
     (tee_local $4
      (i32.add
       (i32.load8_u offset=85712
        (i32.const 0)
       )
       (i32.const 1)
      )
     )
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $4)
       (i32.const 255)
      )
      (i32.const 85712)
     )
     (get_local $5)
    )
   )
   (block $label$8
    (br_if $label$8
     (i32.load8_u
      (i32.add
       (get_local $1)
       (tee_local $4
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (tee_local $5
                (i32.shl
                 (get_local $3)
                 (i32.const 24)
                )
               )
               (i32.const -50331648)
              )
              (i32.const 24)
             )
             (get_local $2)
            )
            (i32.const 2)
           )
           (get_local $0)
          )
          (i32.const 5040)
         )
        )
       )
      )
     )
    )
    (i32.store8 offset=85712
     (i32.const 0)
     (tee_local $6
      (i32.add
       (i32.load8_u offset=85712
        (i32.const 0)
       )
       (i32.const 1)
      )
     )
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $6)
       (i32.const 255)
      )
      (i32.const 85712)
     )
     (get_local $4)
    )
   )
   (block $label$9
    (br_if $label$9
     (i32.load8_u
      (i32.add
       (get_local $1)
       (tee_local $5
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (get_local $5)
               (i32.const -67108864)
              )
              (i32.const 24)
             )
             (get_local $2)
            )
            (i32.const 2)
           )
           (get_local $0)
          )
          (i32.const 5040)
         )
        )
       )
      )
     )
    )
    (i32.store8 offset=85712
     (i32.const 0)
     (tee_local $4
      (i32.add
       (i32.load8_u offset=85712
        (i32.const 0)
       )
       (i32.const 1)
      )
     )
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $4)
       (i32.const 255)
      )
      (i32.const 85712)
     )
     (get_local $5)
    )
   )
   (br_if $label$0
    (i32.load8_u
     (i32.add
      (get_local $1)
      (tee_local $2
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.add
              (i32.shl
               (get_local $3)
               (i32.const 24)
              )
              (i32.const -83886080)
             )
             (i32.const 24)
            )
            (get_local $2)
           )
           (i32.const 2)
          )
          (get_local $0)
         )
         (i32.const 5040)
        )
       )
      )
     )
    )
   )
   (i32.store8 offset=85712
    (i32.const 0)
    (tee_local $0
     (i32.add
      (i32.load8_u offset=85712
       (i32.const 0)
      )
      (i32.const 1)
     )
    )
   )
   (i32.store8
    (i32.add
     (i32.and
      (get_local $0)
      (i32.const 255)
     )
     (i32.const 85712)
    )
    (get_local $2)
   )
  )
  (i32.load offset=85712
   (i32.const 0)
  )
 )
 (func $_Z16getFreeFourPointhPct (; 19 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (set_local $7
   (i32.const 0)
  )
  (i32.store offset=85712
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $4
   (i32.mul
    (get_local $0)
    (i32.const 29)
   )
  )
  (set_local $5
   (i32.or
    (i32.shr_u
     (get_local $2)
     (i32.const 12)
    )
    (i32.const 56)
   )
  )
  (set_local $3
   (i32.and
    (i32.shr_u
     (get_local $2)
     (i32.const 5)
    )
    (i32.const 7)
   )
  )
  (block $label$0
   (loop $label$1
    (br_if $label$0
     (i32.lt_s
      (i32.shr_s
       (i32.shl
        (get_local $7)
        (i32.const 24)
       )
       (i32.const 24)
      )
      (i32.const -4)
     )
    )
    (set_local $6
     (i32.add
      (get_local $3)
      (get_local $7)
     )
    )
    (set_local $7
     (tee_local $0
      (i32.add
       (get_local $7)
       (i32.const -1)
      )
     )
    )
    (br_if $label$1
     (i32.load8_u
      (i32.add
       (get_local $1)
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.shl
              (get_local $6)
              (i32.const 24)
             )
             (i32.const 24)
            )
            (get_local $4)
           )
           (i32.const 2)
          )
          (get_local $5)
         )
         (i32.const 5040)
        )
       )
      )
     )
    )
   )
   (loop $label$2
    (block $label$3
     (br_if $label$3
      (i32.load8_u
       (i32.add
        (get_local $1)
        (tee_local $7
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.shl
                (i32.add
                 (get_local $3)
                 (get_local $0)
                )
                (i32.const 24)
               )
               (i32.const 24)
              )
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 5040)
          )
         )
        )
       )
      )
     )
     (i32.store8 offset=85712
      (i32.const 0)
      (tee_local $6
       (i32.add
        (i32.load8_u offset=85712
         (i32.const 0)
        )
        (i32.const 1)
       )
      )
     )
     (i32.store8
      (i32.add
       (i32.and
        (get_local $6)
        (i32.const 255)
       )
       (i32.const 85712)
      )
      (get_local $7)
     )
    )
    (set_local $7
     (i32.shl
      (get_local $0)
      (i32.const 24)
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const -1)
     )
    )
    (br_if $label$2
     (i32.gt_s
      (i32.shr_s
       (get_local $7)
       (i32.const 24)
      )
      (i32.const -5)
     )
    )
   )
  )
  (i32.store8 offset=85712
   (i32.const 0)
   (i32.and
    (i32.shr_u
     (get_local $2)
     (i32.const 8)
    )
    (i32.const 7)
   )
  )
  (i32.load offset=85712
   (i32.const 0)
  )
 )
 (func $_Z6isFoulhPc (; 20 ;) (param $0 i32) (param $1 i32) (result i32)
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
  (set_local $3
   (i32.load8_u
    (tee_local $2
     (i32.add
      (get_local $1)
      (get_local $0)
     )
    )
   )
  )
  (set_local $5
   (i32.const 1)
  )
  (i32.store8
   (get_local $2)
   (i32.const 1)
  )
  (set_local $6
   (i32.const 0)
  )
  (i32.store8 offset=85283
   (i32.const 0)
   (get_local $0)
  )
  (i32.store8 offset=85282
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store16 offset=85280
   (i32.const 0)
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.eq
     (tee_local $13
      (i32.and
       (tee_local $4
        (call $_Z13testLineThreehhcPc
         (get_local $0)
         (i32.const 0)
         (i32.const 1)
         (get_local $1)
        )
       )
       (i32.const 31)
      )
     )
     (i32.const 10)
    )
   )
   (set_local $12
    (i32.const 0)
   )
   (block $label$1
    (br_if $label$1
     (i32.gt_u
      (get_local $13)
      (i32.const 16)
     )
    )
    (block $label$2
     (br_if $label$2
      (i32.le_u
       (get_local $13)
       (i32.const 7)
      )
     )
     (set_local $6
      (i32.const 1)
     )
     (set_local $5
      (i32.const 0)
     )
     (set_local $12
      (i32.const 0)
     )
     (br $label$1)
    )
    (set_local $5
     (i32.const 0)
    )
    (set_local $6
     (i32.const 0)
    )
    (set_local $12
     (i32.const 0)
    )
    (br_if $label$1
     (i32.ne
      (get_local $13)
      (i32.const 7)
     )
    )
    (set_local $5
     (i32.const 0)
    )
    (set_local $12
     (i32.const 1)
    )
    (i32.store16
     (i32.add
      (i32.shl
       (tee_local $13
        (i32.load8_u offset=85281
         (i32.const 0)
        )
       )
       (i32.const 1)
      )
      (i32.const 85284)
     )
     (i32.and
      (get_local $4)
      (i32.const 36863)
     )
    )
    (i32.store8 offset=85281
     (i32.const 0)
     (i32.add
      (get_local $13)
      (i32.const 1)
     )
    )
    (set_local $6
     (i32.const 0)
    )
   )
   (br_if $label$0
    (i32.eq
     (tee_local $13
      (i32.and
       (tee_local $4
        (call $_Z13testLineThreehhcPc
         (get_local $0)
         (i32.const 1)
         (i32.const 1)
         (get_local $1)
        )
       )
       (i32.const 31)
      )
     )
     (i32.const 10)
    )
   )
   (block $label$3
    (block $label$4
     (br_if $label$4
      (i32.le_u
       (get_local $13)
       (i32.const 16)
      )
     )
     (set_local $5
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (br $label$3)
    )
    (block $label$5
     (br_if $label$5
      (i32.le_u
       (get_local $13)
       (i32.const 7)
      )
     )
     (set_local $6
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br $label$3)
    )
    (br_if $label$3
     (i32.ne
      (get_local $13)
      (i32.const 7)
     )
    )
    (i32.store16
     (i32.add
      (i32.shl
       (tee_local $13
        (i32.load8_u offset=85281
         (i32.const 0)
        )
       )
       (i32.const 1)
      )
      (i32.const 85284)
     )
     (i32.or
      (i32.and
       (get_local $4)
       (i32.const 36863)
      )
      (i32.const 4096)
     )
    )
    (i32.store8 offset=85281
     (i32.const 0)
     (i32.add
      (get_local $13)
      (i32.const 1)
     )
    )
    (set_local $12
     (i32.add
      (get_local $12)
      (i32.const 1)
     )
    )
   )
   (br_if $label$0
    (i32.eq
     (tee_local $13
      (i32.and
       (tee_local $4
        (call $_Z13testLineThreehhcPc
         (get_local $0)
         (i32.const 2)
         (i32.const 1)
         (get_local $1)
        )
       )
       (i32.const 31)
      )
     )
     (i32.const 10)
    )
   )
   (block $label$6
    (block $label$7
     (br_if $label$7
      (i32.le_u
       (get_local $13)
       (i32.const 16)
      )
     )
     (set_local $5
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (br $label$6)
    )
    (block $label$8
     (br_if $label$8
      (i32.le_u
       (get_local $13)
       (i32.const 7)
      )
     )
     (set_local $6
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br $label$6)
    )
    (br_if $label$6
     (i32.ne
      (get_local $13)
      (i32.const 7)
     )
    )
    (i32.store16
     (i32.add
      (i32.shl
       (tee_local $13
        (i32.load8_u offset=85281
         (i32.const 0)
        )
       )
       (i32.const 1)
      )
      (i32.const 85284)
     )
     (i32.or
      (i32.and
       (get_local $4)
       (i32.const 36863)
      )
      (i32.const 8192)
     )
    )
    (i32.store8 offset=85281
     (i32.const 0)
     (i32.add
      (get_local $13)
      (i32.const 1)
     )
    )
    (set_local $12
     (i32.add
      (get_local $12)
      (i32.const 1)
     )
    )
   )
   (br_if $label$0
    (i32.eq
     (tee_local $0
      (i32.and
       (tee_local $13
        (call $_Z13testLineThreehhcPc
         (get_local $0)
         (i32.const 3)
         (i32.const 1)
         (get_local $1)
        )
       )
       (i32.const 31)
      )
     )
     (i32.const 10)
    )
   )
   (block $label$9
    (block $label$10
     (br_if $label$10
      (i32.gt_u
       (get_local $0)
       (i32.const 16)
      )
     )
     (block $label$11
      (block $label$12
       (br_if $label$12
        (i32.le_u
         (get_local $0)
         (i32.const 7)
        )
       )
       (set_local $6
        (i32.add
         (get_local $6)
         (i32.const 1)
        )
       )
       (br $label$11)
      )
      (br_if $label$11
       (i32.ne
        (get_local $0)
        (i32.const 7)
       )
      )
      (i32.store16
       (i32.add
        (i32.shl
         (tee_local $0
          (i32.load8_u offset=85281
           (i32.const 0)
          )
         )
         (i32.const 1)
        )
        (i32.const 85284)
       )
       (i32.or
        (i32.and
         (get_local $13)
         (i32.const 36863)
        )
        (i32.const 12288)
       )
      )
      (i32.store8 offset=85281
       (i32.const 0)
       (i32.add
        (get_local $0)
        (i32.const 1)
       )
      )
      (set_local $12
       (i32.add
        (get_local $12)
        (i32.const 1)
       )
      )
     )
     (br_if $label$10
      (i32.and
       (get_local $5)
       (i32.const 255)
      )
     )
     (br_if $label$10
      (i32.gt_s
       (i32.shr_s
        (i32.shl
         (get_local $6)
         (i32.const 24)
        )
        (i32.const 24)
       )
       (i32.const 1)
      )
     )
     (br_if $label$0
      (i32.lt_s
       (i32.shr_s
        (i32.shl
         (get_local $12)
         (i32.const 24)
        )
        (i32.const 24)
       )
       (i32.const 2)
      )
     )
     (set_local $0
      (i32.const 0)
     )
     (set_local $13
      (i32.const 0)
     )
     (br $label$9)
    )
    (i32.store8 offset=85280
     (i32.const 0)
     (i32.const 2)
    )
    (br $label$0)
   )
   (loop $label$13
    (set_local $7
     (get_local $13)
    )
    (set_local $5
     (i32.load8_u
      (tee_local $6
       (i32.add
        (tee_local $13
         (i32.mul
          (get_local $0)
          (i32.const 12)
         )
        )
        (i32.const 85280)
       )
      )
     )
    )
    (block $label$14
     (block $label$15
      (block $label$16
       (block $label$17
        (block $label$18
         (br_if $label$18
          (i32.and
           (get_local $0)
           (i32.const 1)
          )
         )
         (set_local $0
          (i32.load8_u
           (i32.add
            (i32.or
             (get_local $13)
             (i32.const 3)
            )
            (i32.const 85280)
           )
          )
         )
         (br_if $label$17
          (i32.lt_u
           (i32.and
            (get_local $5)
            (i32.const 255)
           )
           (i32.const 2)
          )
         )
         (i32.store8
          (i32.add
           (get_local $1)
           (get_local $0)
          )
          (i32.const 0)
         )
         (set_local $13
          (i32.add
           (get_local $7)
           (i32.const -1)
          )
         )
         (br_if $label$14
          (i32.and
           (get_local $7)
           (i32.const 255)
          )
         )
         (i32.store8 offset=85280
          (i32.const 0)
          (i32.const 2)
         )
         (br $label$14)
        )
        (br_if $label$16
         (i32.ne
          (i32.and
           (get_local $5)
           (i32.const 255)
          )
          (i32.const 1)
         )
        )
        (i32.store8
         (tee_local $0
          (i32.add
           (i32.mul
            (i32.shr_s
             (i32.shl
              (tee_local $13
               (i32.add
                (get_local $7)
                (i32.const -1)
               )
              )
              (i32.const 24)
             )
             (i32.const 24)
            )
            (i32.const 12)
           )
           (i32.const 85280)
          )
         )
         (i32.add
          (i32.load8_u
           (get_local $0)
          )
          (i32.const 1)
         )
        )
        (br $label$14)
       )
       (br_if $label$15
        (i32.ne
         (tee_local $8
          (i32.load8_u
           (tee_local $11
            (i32.add
             (i32.or
              (get_local $13)
              (i32.const 2)
             )
             (i32.const 85280)
            )
           )
          )
         )
         (i32.load8_u
          (i32.add
           (i32.or
            (get_local $13)
            (i32.const 1)
           )
           (i32.const 85280)
          )
         )
        )
       )
       (i32.store8
        (i32.add
         (get_local $1)
         (get_local $0)
        )
        (i32.const 0)
       )
       (br_if $label$0
        (i32.lt_s
         (tee_local $0
          (i32.shr_s
           (i32.add
            (i32.shl
             (get_local $7)
             (i32.const 24)
            )
            (i32.const -16777216)
           )
           (i32.const 24)
          )
         )
         (i32.const 0)
        )
       )
       (i32.store8
        (i32.add
         (i32.mul
          (get_local $0)
          (i32.const 12)
         )
         (i32.const 85280)
        )
        (i32.const 1)
       )
       (set_local $13
        (get_local $0)
       )
       (br $label$13)
      )
      (block $label$19
       (br_if $label$19
        (i32.eq
         (tee_local $0
          (i32.load8_u
           (tee_local $5
            (i32.add
             (i32.or
              (get_local $13)
              (i32.const 2)
             )
             (i32.const 85280)
            )
           )
          )
         )
         (i32.load8_u
          (i32.add
           (i32.or
            (get_local $13)
            (i32.const 1)
           )
           (i32.const 85280)
          )
         )
        )
       )
       (i32.store8
        (get_local $5)
        (i32.add
         (get_local $0)
         (i32.const 1)
        )
       )
       (i32.store8
        (tee_local $6
         (i32.add
          (get_local $1)
          (tee_local $5
           (i32.load8_u
            (i32.add
             (i32.add
              (get_local $13)
              (get_local $0)
             )
             (i32.const 85284)
            )
           )
          )
         )
        )
        (i32.const 1)
       )
       (i32.store8
        (i32.add
         (tee_local $0
          (i32.mul
           (i32.shr_s
            (i32.shl
             (tee_local $13
              (i32.add
               (get_local $7)
               (i32.const 1)
              )
             )
             (i32.const 24)
            )
            (i32.const 24)
           )
           (i32.const 12)
          )
         )
         (i32.const 85280)
        )
        (i32.const 0)
       )
       (i32.store8
        (tee_local $12
         (i32.add
          (i32.or
           (get_local $0)
           (i32.const 1)
          )
          (i32.const 85280)
         )
        )
        (i32.const 0)
       )
       (i32.store8
        (i32.add
         (i32.or
          (get_local $0)
          (i32.const 2)
         )
         (i32.const 85280)
        )
        (i32.const 0)
       )
       (i32.store8
        (i32.add
         (i32.or
          (get_local $0)
          (i32.const 3)
         )
         (i32.const 85280)
        )
        (get_local $5)
       )
       (block $label$20
        (block $label$21
         (br_if $label$21
          (i32.eq
           (tee_local $4
            (i32.and
             (tee_local $8
              (call $_Z13testLineThreehhcPc
               (get_local $5)
               (i32.const 0)
               (i32.const 1)
               (get_local $1)
              )
             )
             (i32.const 31)
            )
           )
           (i32.const 10)
          )
         )
         (set_local $10
          (i32.add
           (get_local $0)
           (i32.const 85284)
          )
         )
         (block $label$22
          (block $label$23
           (block $label$24
            (br_if $label$24
             (i32.le_u
              (get_local $4)
              (i32.const 16)
             )
            )
            (set_local $4
             (i32.const 0)
            )
            (set_local $9
             (i32.const 1)
            )
            (br $label$23)
           )
           (block $label$25
            (br_if $label$25
             (i32.le_u
              (get_local $4)
              (i32.const 7)
             )
            )
            (set_local $4
             (i32.const 1)
            )
            (set_local $9
             (i32.const 0)
            )
            (br $label$23)
           )
           (set_local $9
            (i32.const 0)
           )
           (block $label$26
            (br_if $label$26
             (i32.ne
              (get_local $4)
              (i32.const 7)
             )
            )
            (set_local $11
             (i32.const 1)
            )
            (i32.store16
             (i32.add
              (get_local $10)
              (i32.shl
               (tee_local $0
                (i32.load8_u
                 (get_local $12)
                )
               )
               (i32.const 1)
              )
             )
             (i32.and
              (get_local $8)
              (i32.const 36863)
             )
            )
            (i32.store8
             (get_local $12)
             (i32.add
              (get_local $0)
              (i32.const 1)
             )
            )
            (set_local $4
             (i32.const 0)
            )
            (br $label$22)
           )
           (set_local $4
            (i32.const 0)
           )
          )
          (set_local $11
           (i32.const 0)
          )
         )
         (br_if $label$21
          (i32.eq
           (tee_local $0
            (i32.and
             (tee_local $8
              (call $_Z13testLineThreehhcPc
               (get_local $5)
               (i32.const 1)
               (i32.const 1)
               (get_local $1)
              )
             )
             (i32.const 31)
            )
           )
           (i32.const 10)
          )
         )
         (block $label$27
          (block $label$28
           (br_if $label$28
            (i32.le_u
             (get_local $0)
             (i32.const 16)
            )
           )
           (set_local $9
            (i32.add
             (get_local $9)
             (i32.const 1)
            )
           )
           (br $label$27)
          )
          (block $label$29
           (br_if $label$29
            (i32.le_u
             (get_local $0)
             (i32.const 7)
            )
           )
           (set_local $4
            (i32.add
             (get_local $4)
             (i32.const 1)
            )
           )
           (br $label$27)
          )
          (br_if $label$27
           (i32.ne
            (get_local $0)
            (i32.const 7)
           )
          )
          (i32.store16
           (i32.add
            (get_local $10)
            (i32.shl
             (tee_local $0
              (i32.load8_u
               (get_local $12)
              )
             )
             (i32.const 1)
            )
           )
           (i32.or
            (i32.and
             (get_local $8)
             (i32.const 36863)
            )
            (i32.const 4096)
           )
          )
          (i32.store8
           (get_local $12)
           (i32.add
            (get_local $0)
            (i32.const 1)
           )
          )
          (set_local $11
           (i32.add
            (get_local $11)
            (i32.const 1)
           )
          )
         )
         (br_if $label$21
          (i32.eq
           (tee_local $0
            (i32.and
             (tee_local $8
              (call $_Z13testLineThreehhcPc
               (get_local $5)
               (i32.const 2)
               (i32.const 1)
               (get_local $1)
              )
             )
             (i32.const 31)
            )
           )
           (i32.const 10)
          )
         )
         (block $label$30
          (block $label$31
           (br_if $label$31
            (i32.le_u
             (get_local $0)
             (i32.const 16)
            )
           )
           (set_local $9
            (i32.add
             (get_local $9)
             (i32.const 1)
            )
           )
           (br $label$30)
          )
          (block $label$32
           (br_if $label$32
            (i32.le_u
             (get_local $0)
             (i32.const 7)
            )
           )
           (set_local $4
            (i32.add
             (get_local $4)
             (i32.const 1)
            )
           )
           (br $label$30)
          )
          (br_if $label$30
           (i32.ne
            (get_local $0)
            (i32.const 7)
           )
          )
          (i32.store16
           (i32.add
            (get_local $10)
            (i32.shl
             (tee_local $0
              (i32.load8_u
               (get_local $12)
              )
             )
             (i32.const 1)
            )
           )
           (i32.or
            (i32.and
             (get_local $8)
             (i32.const 36863)
            )
            (i32.const 8192)
           )
          )
          (i32.store8
           (get_local $12)
           (i32.add
            (get_local $0)
            (i32.const 1)
           )
          )
          (set_local $11
           (i32.add
            (get_local $11)
            (i32.const 1)
           )
          )
         )
         (br_if $label$21
          (i32.eq
           (tee_local $0
            (i32.and
             (tee_local $5
              (call $_Z13testLineThreehhcPc
               (get_local $5)
               (i32.const 3)
               (i32.const 1)
               (get_local $1)
              )
             )
             (i32.const 31)
            )
           )
           (i32.const 10)
          )
         )
         (br_if $label$21
          (i32.gt_u
           (get_local $0)
           (i32.const 16)
          )
         )
         (block $label$33
          (block $label$34
           (br_if $label$34
            (i32.le_u
             (get_local $0)
             (i32.const 7)
            )
           )
           (set_local $4
            (i32.add
             (get_local $4)
             (i32.const 1)
            )
           )
           (br_if $label$33
            (i32.eqz
             (i32.and
              (get_local $9)
              (i32.const 255)
             )
            )
           )
           (br $label$21)
          )
          (block $label$35
           (br_if $label$35
            (i32.ne
             (get_local $0)
             (i32.const 7)
            )
           )
           (i32.store16
            (i32.add
             (get_local $10)
             (i32.shl
              (tee_local $0
               (i32.load8_u
                (get_local $12)
               )
              )
              (i32.const 1)
             )
            )
            (i32.or
             (i32.and
              (get_local $5)
              (i32.const 36863)
             )
             (i32.const 12288)
            )
           )
           (i32.store8
            (get_local $12)
            (i32.add
             (get_local $0)
             (i32.const 1)
            )
           )
           (set_local $11
            (i32.add
             (get_local $11)
             (i32.const 1)
            )
           )
          )
          (br_if $label$21
           (i32.and
            (get_local $9)
            (i32.const 255)
           )
          )
         )
         (br_if $label$21
          (i32.gt_s
           (i32.shr_s
            (i32.shl
             (get_local $4)
             (i32.const 24)
            )
            (i32.const 24)
           )
           (i32.const 1)
          )
         )
         (br_if $label$14
          (i32.gt_s
           (i32.shr_s
            (i32.shl
             (get_local $11)
             (i32.const 24)
            )
            (i32.const 24)
           )
           (i32.const 1)
          )
         )
         (i32.store8
          (get_local $6)
          (i32.const 0)
         )
         (i32.store8
          (i32.add
           (i32.mul
            (i32.shr_s
             (i32.shl
              (get_local $7)
              (i32.const 24)
             )
             (i32.const 24)
            )
            (i32.const 12)
           )
           (i32.const 85280)
          )
          (i32.const 1)
         )
         (br $label$20)
        )
        (i32.store8
         (get_local $6)
         (i32.const 0)
        )
       )
       (set_local $13
        (get_local $7)
       )
       (br $label$14)
      )
      (set_local $13
       (i32.add
        (get_local $7)
        (i32.const -1)
       )
      )
      (br $label$14)
     )
     (set_local $13
      (i32.const 0)
     )
     (i32.store offset=85712
      (i32.const 0)
      (i32.const 0)
     )
     (set_local $5
      (i32.mul
       (get_local $0)
       (i32.const 29)
      )
     )
     (set_local $6
      (i32.or
       (i32.shr_u
        (tee_local $9
         (i32.load16_u
          (i32.add
           (i32.add
            (get_local $6)
            (i32.shl
             (get_local $8)
             (i32.const 1)
            )
           )
           (i32.const 4)
          )
         )
        )
        (i32.const 12)
       )
       (i32.const 56)
      )
     )
     (set_local $4
      (i32.and
       (i32.shr_u
        (get_local $9)
        (i32.const 5)
       )
       (i32.const 7)
      )
     )
     (block $label$36
      (loop $label$37
       (br_if $label$36
        (i32.lt_s
         (i32.shr_s
          (i32.shl
           (get_local $13)
           (i32.const 24)
          )
          (i32.const 24)
         )
         (i32.const -4)
        )
       )
       (set_local $12
        (i32.add
         (get_local $4)
         (get_local $13)
        )
       )
       (set_local $13
        (tee_local $0
         (i32.add
          (get_local $13)
          (i32.const -1)
         )
        )
       )
       (br_if $label$37
        (i32.load8_u
         (i32.add
          (get_local $1)
          (i32.load8_u
           (i32.add
            (i32.add
             (i32.shl
              (i32.add
               (i32.shr_s
                (i32.shl
                 (get_local $12)
                 (i32.const 24)
                )
                (i32.const 24)
               )
               (get_local $5)
              )
              (i32.const 2)
             )
             (get_local $6)
            )
            (i32.const 5040)
           )
          )
         )
        )
       )
      )
      (loop $label$38
       (block $label$39
        (br_if $label$39
         (i32.load8_u
          (i32.add
           (get_local $1)
           (tee_local $13
            (i32.load8_u
             (i32.add
              (i32.add
               (i32.shl
                (i32.add
                 (i32.shr_s
                  (i32.shl
                   (i32.add
                    (get_local $4)
                    (get_local $0)
                   )
                   (i32.const 24)
                  )
                  (i32.const 24)
                 )
                 (get_local $5)
                )
                (i32.const 2)
               )
               (get_local $6)
              )
              (i32.const 5040)
             )
            )
           )
          )
         )
        )
        (i32.store8 offset=85712
         (i32.const 0)
         (tee_local $12
          (i32.add
           (i32.load8_u offset=85712
            (i32.const 0)
           )
           (i32.const 1)
          )
         )
        )
        (i32.store8
         (i32.add
          (i32.and
           (get_local $12)
           (i32.const 255)
          )
          (i32.const 85712)
         )
         (get_local $13)
        )
       )
       (set_local $13
        (i32.shl
         (get_local $0)
         (i32.const 24)
        )
       )
       (set_local $0
        (i32.add
         (get_local $0)
         (i32.const -1)
        )
       )
       (br_if $label$38
        (i32.gt_s
         (i32.shr_s
          (get_local $13)
          (i32.const 24)
         )
         (i32.const -5)
        )
       )
      )
     )
     (i32.store8 offset=85712
      (i32.const 0)
      (i32.and
       (i32.shr_u
        (get_local $9)
        (i32.const 8)
       )
       (i32.const 7)
      )
     )
     (i32.store8
      (get_local $11)
      (i32.add
       (get_local $8)
       (i32.const 1)
      )
     )
     (i32.store8
      (i32.add
       (tee_local $0
        (i32.mul
         (i32.shr_s
          (i32.shl
           (tee_local $13
            (i32.add
             (get_local $7)
             (i32.const 1)
            )
           )
           (i32.const 24)
          )
          (i32.const 24)
         )
         (i32.const 12)
        )
       )
       (i32.const 85280)
      )
      (i32.const 0)
     )
     (i32.store8
      (i32.add
       (get_local $0)
       (i32.const 85284)
      )
      (i32.shr_u
       (tee_local $5
        (i32.load offset=85712
         (i32.const 0)
        )
       )
       (i32.const 8)
      )
     )
     (i32.store8
      (i32.add
       (i32.or
        (get_local $0)
        (i32.const 1)
       )
       (i32.const 85280)
      )
      (get_local $5)
     )
     (i32.store8
      (i32.add
       (i32.or
        (get_local $0)
        (i32.const 2)
       )
       (i32.const 85280)
      )
      (i32.const 0)
     )
     (i32.store8
      (i32.add
       (get_local $0)
       (i32.const 85285)
      )
      (i32.shr_u
       (get_local $5)
       (i32.const 16)
      )
     )
    )
    (br_if $label$13
     (i32.gt_s
      (tee_local $0
       (i32.shr_s
        (i32.shl
         (get_local $13)
         (i32.const 24)
        )
        (i32.const 24)
       )
      )
      (i32.const -1)
     )
    )
   )
  )
  (i32.store8
   (get_local $2)
   (get_local $3)
  )
  (i32.gt_u
   (i32.load8_u offset=85280
    (i32.const 0)
   )
   (i32.const 1)
  )
 )
 (func $_Z8testFivePccPt (; 21 ;) (param $0 i32) (param $1 i32) (param $2 i32)
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
  (local $24 i32)
  (i64.store offset=85728 align=1
   (i32.const 0)
   (i64.const 0)
  )
  (i64.store offset=85748 align=1
   (i32.const 0)
   (i64.const 0)
  )
  (i32.store8 offset=85742
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store16 offset=85740 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=85736 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store8 offset=85758
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store16 offset=85756 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=85744 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $3
   (call $memset
    (get_local $2)
    (i32.const 0)
    (i32.const 450)
   )
  )
  (set_local $6
   (i32.sub
    (i32.const 15)
    (tee_local $5
     (i32.load8_u offset=16
      (i32.const 0)
     )
    )
   )
  )
  (set_local $8
   (i32.add
    (tee_local $7
     (i32.shl
      (get_local $5)
      (i32.const 1)
     )
    )
    (i32.const 251)
   )
  )
  (set_local $9
   (i32.const 0)
  )
  (loop $label$0
   (set_local $4
    (call $memset
     (i32.const 85760)
     (i32.const 0)
     (i32.const 450)
    )
   )
   (block $label$1
    (br_if $label$1
     (i32.le_u
      (tee_local $11
       (i32.and
        (i32.add
         (tee_local $19
          (select
           (get_local $6)
           (i32.const 0)
           (i32.eq
            (get_local $9)
            (i32.const 2)
           )
          )
         )
         (select
          (get_local $5)
          (get_local $8)
          (i32.lt_u
           (get_local $9)
           (i32.const 2)
          )
         )
        )
        (i32.const 255)
       )
      )
      (tee_local $10
       (i32.and
        (get_local $19)
        (i32.const 255)
       )
      )
     )
    )
    (set_local $13
     (i32.sub
      (i32.const 1)
      (get_local $10)
     )
    )
    (set_local $12
     (i32.mul
      (get_local $9)
      (i32.const 29)
     )
    )
    (set_local $2
     (get_local $10)
    )
    (loop $label$2
     (set_local $20
      (i32.const 14)
     )
     (block $label$3
      (br_if $label$3
       (i32.lt_u
        (get_local $9)
        (i32.const 3)
       )
      )
      (br_if $label$3
       (i32.lt_u
        (tee_local $16
         (i32.and
          (get_local $19)
          (i32.const 255)
         )
        )
        (get_local $5)
       )
      )
      (set_local $20
       (i32.sub
        (select
         (i32.add
          (get_local $2)
          (i32.const 15)
         )
         (i32.const 29)
         (i32.lt_u
          (get_local $16)
          (i32.const 15)
         )
        )
        (get_local $5)
       )
      )
     )
     (set_local $16
      (i32.and
       (get_local $20)
       (i32.const 255)
      )
     )
     (block $label$4
      (block $label$5
       (br_if $label$5
        (i32.gt_u
         (get_local $9)
         (i32.const 1)
        )
       )
       (set_local $18
        (i32.add
         (get_local $16)
         (get_local $5)
        )
       )
       (br $label$4)
      )
      (block $label$6
       (br_if $label$6
        (i32.ge_s
         (tee_local $18
          (i32.sub
           (get_local $2)
           (get_local $10)
          )
         )
         (get_local $5)
        )
       )
       (set_local $18
        (i32.add
         (i32.add
          (get_local $13)
          (get_local $2)
         )
         (get_local $16)
        )
       )
       (br $label$4)
      )
      (set_local $18
       (i32.add
        (i32.add
         (get_local $16)
         (i32.xor
          (get_local $18)
          (i32.const -1)
         )
        )
        (get_local $7)
       )
      )
     )
     (block $label$7
      (br_if $label$7
       (i32.le_u
        (tee_local $14
         (i32.and
          (get_local $18)
          (i32.const 255)
         )
        )
        (get_local $16)
       )
      )
      (set_local $15
       (i32.mul
        (i32.add
         (get_local $2)
         (get_local $12)
        )
        (i32.const 43)
       )
      )
      (set_local $21
       (i32.const 0)
      )
      (set_local $24
       (i32.const 0)
      )
      (set_local $23
       (i32.const 0)
      )
      (set_local $22
       (i32.const 0)
      )
      (loop $label$8
       (block $label$9
        (block $label$10
         (br_if $label$10
          (i32.eqz
           (tee_local $2
            (i32.load8_u
             (i32.add
              (get_local $0)
              (tee_local $18
               (i32.load8_u
                (i32.add
                 (tee_local $17
                  (i32.add
                   (get_local $16)
                   (get_local $15)
                  )
                 )
                 (i32.const 48)
                )
               )
              )
             )
            )
           )
          )
         )
         (set_local $22
          (select
           (i32.add
            (get_local $22)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $2
            (i32.eq
             (get_local $2)
             (i32.and
              (get_local $1)
              (i32.const 255)
             )
            )
           )
          )
         )
         (set_local $24
          (select
           (get_local $24)
           (get_local $21)
           (get_local $2)
          )
         )
         (set_local $23
          (select
           (get_local $23)
           (i32.const 0)
           (get_local $2)
          )
         )
         (br $label$9)
        )
        (i32.store8
         (i32.add
          (tee_local $2
           (i32.and
            (get_local $21)
            (i32.const 255)
           )
          )
          (i32.const 85728)
         )
         (get_local $18)
        )
        (i32.store8
         (i32.add
          (get_local $2)
          (i32.const 85744)
         )
         (get_local $20)
        )
        (set_local $21
         (i32.add
          (get_local $21)
          (i32.const 1)
         )
        )
        (set_local $23
         (i32.add
          (get_local $23)
          (i32.const 1)
         )
        )
       )
       (block $label$11
        (br_if $label$11
         (i32.ne
          (i32.add
           (i32.and
            (get_local $23)
            (i32.const 255)
           )
           (tee_local $2
            (i32.and
             (get_local $22)
             (i32.const 255)
            )
           )
          )
          (i32.const 5)
         )
        )
        (block $label$12
         (br_if $label$12
          (i32.ne
           (get_local $2)
           (i32.const 4)
          )
         )
         (block $label$13
          (br_if $label$13
           (i32.ne
            (get_local $1)
            (i32.const 1)
           )
          )
          (br_if $label$13
           (i32.ne
            (i32.and
             (i32.load8_u offset=32
              (i32.const 0)
             )
             (i32.const 255)
            )
            (i32.const 2)
           )
          )
          (block $label$14
           (br_if $label$14
            (i32.eq
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $17)
                 (i32.const 43)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
           (br_if $label$13
            (i32.ne
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $17)
                 (i32.const 49)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
          )
          (br_if $label$12
           (i32.ge_u
            (tee_local $2
             (i32.and
              (get_local $24)
              (i32.const 255)
             )
            )
            (tee_local $18
             (i32.and
              (get_local $21)
              (i32.const 255)
             )
            )
           )
          )
          (loop $label$15
           (i32.store16
            (i32.add
             (i32.shl
              (i32.load8_u
               (i32.add
                (get_local $2)
                (i32.const 85728)
               )
              )
              (i32.const 1)
             )
             (get_local $4)
            )
            (i32.or
             (i32.shl
              (i32.sub
               (get_local $16)
               (i32.load8_u
                (i32.add
                 (get_local $2)
                 (i32.const 85744)
                )
               )
              )
              (i32.const 5)
             )
             (i32.const 28)
            )
           )
           (br_if $label$15
            (i32.ne
             (get_local $18)
             (tee_local $2
              (i32.add
               (get_local $2)
               (i32.const 1)
              )
             )
            )
           )
           (br $label$12)
          )
         )
         (br_if $label$12
          (i32.ge_u
           (tee_local $2
            (i32.and
             (get_local $24)
             (i32.const 255)
            )
           )
           (tee_local $18
            (i32.and
             (get_local $21)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$16
          (i32.store16
           (i32.add
            (i32.shl
             (i32.load8_u
              (i32.add
               (get_local $2)
               (i32.const 85728)
              )
             )
             (i32.const 1)
            )
            (get_local $4)
           )
           (i32.or
            (i32.shl
             (i32.sub
              (get_local $16)
              (i32.load8_u
               (i32.add
                (get_local $2)
                (i32.const 85744)
               )
              )
             )
             (i32.const 5)
            )
            (i32.const 10)
           )
          )
          (br_if $label$16
           (i32.ne
            (get_local $18)
            (tee_local $2
             (i32.add
              (get_local $2)
              (i32.const 1)
             )
            )
           )
          )
         )
        )
        (block $label$17
         (br_if $label$17
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.load8_u
              (i32.add
               (get_local $17)
               (i32.const 44)
              )
             )
            )
           )
          )
         )
         (set_local $22
          (i32.add
           (get_local $22)
           (i32.const -1)
          )
         )
         (br_if $label$11
          (i32.ge_u
           (tee_local $2
            (i32.and
             (get_local $24)
             (i32.const 255)
            )
           )
           (tee_local $18
            (i32.and
             (get_local $21)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$18
          (i32.store16
           (tee_local $16
            (i32.add
             (i32.shl
              (i32.load8_u
               (i32.add
                (get_local $2)
                (i32.const 85728)
               )
              )
              (i32.const 1)
             )
             (get_local $4)
            )
           )
           (i32.and
            (i32.load16_u
             (get_local $16)
            )
            (i32.const 63487)
           )
          )
          (br_if $label$18
           (i32.ne
            (get_local $18)
            (tee_local $2
             (i32.add
              (get_local $2)
              (i32.const 1)
             )
            )
           )
          )
          (br $label$11)
         )
        )
        (set_local $23
         (i32.add
          (get_local $23)
          (i32.const -1)
         )
        )
        (br_if $label$11
         (i32.ge_u
          (tee_local $2
           (i32.and
            (tee_local $24
             (i32.add
              (get_local $24)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
          )
          (tee_local $17
           (i32.and
            (get_local $21)
            (i32.const 255)
           )
          )
         )
        )
        (set_local $2
         (i32.add
          (get_local $2)
          (i32.const 85728)
         )
        )
        (set_local $16
         (get_local $24)
        )
        (loop $label$19
         (i32.store16
          (tee_local $18
           (i32.add
            (i32.shl
             (i32.load8_u
              (get_local $2)
             )
             (i32.const 1)
            )
            (get_local $4)
           )
          )
          (i32.or
           (i32.load16_u
            (get_local $18)
           )
           (i32.const 32768)
          )
         )
         (set_local $2
          (i32.add
           (get_local $2)
           (i32.const 1)
          )
         )
         (br_if $label$19
          (i32.lt_u
           (i32.and
            (tee_local $16
             (i32.add
              (get_local $16)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
           (get_local $17)
          )
         )
        )
       )
       (br_if $label$8
        (i32.gt_u
         (get_local $14)
         (tee_local $16
          (i32.and
           (tee_local $20
            (i32.add
             (get_local $20)
             (i32.const 1)
            )
           )
           (i32.const 255)
          )
         )
        )
       )
      )
     )
     (br_if $label$2
      (i32.gt_u
       (get_local $11)
       (tee_local $2
        (i32.and
         (tee_local $19
          (i32.add
           (get_local $19)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
    )
   )
   (set_local $18
    (i32.shl
     (get_local $9)
     (i32.const 12)
    )
   )
   (set_local $2
    (i32.const 0)
   )
   (loop $label$20
    (block $label$21
     (br_if $label$21
      (i32.ne
       (i32.and
        (tee_local $16
         (i32.load16_u
          (i32.add
           (get_local $2)
           (get_local $4)
          )
         )
        )
        (i32.const 14)
       )
       (i32.const 10)
      )
     )
     (i32.store16
      (i32.add
       (get_local $3)
       (get_local $2)
      )
      (i32.or
       (i32.and
        (get_local $16)
        (i32.const 36863)
       )
       (get_local $18)
      )
     )
    )
    (br_if $label$20
     (i32.ne
      (tee_local $2
       (i32.add
        (get_local $2)
        (i32.const 2)
       )
      )
      (i32.const 450)
     )
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $9
      (i32.add
       (get_local $9)
       (i32.const 1)
      )
     )
     (i32.const 4)
    )
   )
  )
 )
 (func $_Z8testFourPccPt (; 22 ;) (param $0 i32) (param $1 i32) (param $2 i32)
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
  (local $24 i32)
  (local $25 i32)
  (i64.store offset=85728 align=1
   (i32.const 0)
   (i64.const 0)
  )
  (i64.store offset=85748 align=1
   (i32.const 0)
   (i64.const 0)
  )
  (i32.store8 offset=85742
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store16 offset=85740 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=85736 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store8 offset=85758
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store16 offset=85756 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=85744 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $3
   (call $memset
    (get_local $2)
    (i32.const 0)
    (i32.const 450)
   )
  )
  (set_local $5
   (i32.const 0)
  )
  (loop $label$0
   (set_local $4
    (call $memset
     (i32.const 85760)
     (i32.const 0)
     (i32.const 450)
    )
   )
   (set_local $7
    (i32.and
     (tee_local $18
      (select
       (i32.sub
        (i32.const 15)
        (tee_local $6
         (i32.load8_u offset=16
          (i32.const 0)
         )
        )
       )
       (i32.const 0)
       (i32.eq
        (get_local $5)
        (i32.const 2)
       )
      )
     )
     (i32.const 255)
    )
   )
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.ge_u
       (get_local $5)
       (i32.const 2)
      )
     )
     (set_local $2
      (i32.add
       (get_local $7)
       (get_local $6)
      )
     )
     (br $label$1)
    )
    (set_local $2
     (i32.add
      (i32.add
       (i32.shl
        (get_local $6)
        (i32.const 1)
       )
       (get_local $7)
      )
      (i32.const -5)
     )
    )
   )
   (block $label$3
    (br_if $label$3
     (i32.le_u
      (tee_local $8
       (i32.and
        (get_local $2)
        (i32.const 255)
       )
      )
      (get_local $7)
     )
    )
    (set_local $11
     (i32.shl
      (get_local $6)
      (i32.const 1)
     )
    )
    (set_local $10
     (i32.sub
      (i32.const 1)
      (get_local $7)
     )
    )
    (set_local $9
     (i32.mul
      (get_local $5)
      (i32.const 29)
     )
    )
    (set_local $2
     (get_local $7)
    )
    (loop $label$4
     (set_local $20
      (i32.const 14)
     )
     (block $label$5
      (br_if $label$5
       (i32.lt_u
        (get_local $5)
        (i32.const 3)
       )
      )
      (br_if $label$5
       (i32.lt_u
        (tee_local $17
         (i32.and
          (get_local $18)
          (i32.const 255)
         )
        )
        (get_local $6)
       )
      )
      (set_local $20
       (i32.sub
        (select
         (i32.add
          (get_local $2)
          (i32.const 15)
         )
         (i32.const 29)
         (i32.lt_u
          (get_local $17)
          (i32.const 15)
         )
        )
        (get_local $6)
       )
      )
     )
     (set_local $19
      (i32.and
       (get_local $20)
       (i32.const 255)
      )
     )
     (block $label$6
      (block $label$7
       (br_if $label$7
        (i32.gt_u
         (get_local $5)
         (i32.const 1)
        )
       )
       (set_local $17
        (i32.add
         (get_local $19)
         (get_local $6)
        )
       )
       (br $label$6)
      )
      (block $label$8
       (br_if $label$8
        (i32.ge_s
         (tee_local $17
          (i32.sub
           (get_local $2)
           (get_local $7)
          )
         )
         (get_local $6)
        )
       )
       (set_local $17
        (i32.add
         (i32.add
          (get_local $10)
          (get_local $2)
         )
         (get_local $19)
        )
       )
       (br $label$6)
      )
      (set_local $17
       (i32.add
        (i32.add
         (get_local $19)
         (i32.xor
          (get_local $17)
          (i32.const -1)
         )
        )
        (get_local $11)
       )
      )
     )
     (block $label$9
      (br_if $label$9
       (i32.le_u
        (tee_local $12
         (i32.and
          (get_local $17)
          (i32.const 255)
         )
        )
        (get_local $19)
       )
      )
      (set_local $13
       (i32.mul
        (i32.add
         (get_local $2)
         (get_local $9)
        )
        (i32.const 43)
       )
      )
      (set_local $21
       (i32.const 0)
      )
      (set_local $25
       (i32.const 0)
      )
      (set_local $24
       (i32.const 0)
      )
      (set_local $23
       (i32.const 0)
      )
      (loop $label$10
       (block $label$11
        (block $label$12
         (br_if $label$12
          (i32.eqz
           (tee_local $2
            (i32.load8_u
             (i32.add
              (get_local $0)
              (tee_local $17
               (i32.load8_u
                (i32.add
                 (tee_local $14
                  (i32.add
                   (get_local $19)
                   (get_local $13)
                  )
                 )
                 (i32.const 48)
                )
               )
              )
             )
            )
           )
          )
         )
         (set_local $23
          (select
           (i32.add
            (get_local $23)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $2
            (i32.eq
             (get_local $2)
             (i32.and
              (get_local $1)
              (i32.const 255)
             )
            )
           )
          )
         )
         (set_local $25
          (select
           (get_local $25)
           (get_local $21)
           (get_local $2)
          )
         )
         (set_local $24
          (select
           (get_local $24)
           (i32.const 0)
           (get_local $2)
          )
         )
         (br $label$11)
        )
        (i32.store8
         (i32.add
          (tee_local $2
           (i32.and
            (get_local $21)
            (i32.const 255)
           )
          )
          (i32.const 85728)
         )
         (get_local $17)
        )
        (i32.store8
         (i32.add
          (get_local $2)
          (i32.const 85744)
         )
         (get_local $20)
        )
        (set_local $21
         (i32.add
          (get_local $21)
          (i32.const 1)
         )
        )
        (set_local $24
         (i32.add
          (get_local $24)
          (i32.const 1)
         )
        )
       )
       (block $label$13
        (br_if $label$13
         (i32.ne
          (i32.add
           (i32.and
            (get_local $24)
            (i32.const 255)
           )
           (tee_local $2
            (i32.and
             (get_local $23)
             (i32.const 255)
            )
           )
          )
          (i32.const 5)
         )
        )
        (block $label$14
         (block $label$15
          (block $label$16
           (block $label$17
            (block $label$18
             (br_if $label$18
              (i32.eq
               (get_local $2)
               (i32.const 3)
              )
             )
             (br_if $label$14
              (i32.ne
               (get_local $2)
               (i32.const 4)
              )
             )
             (br_if $label$17
              (i32.ne
               (get_local $1)
               (i32.const 1)
              )
             )
             (br_if $label$17
              (i32.ne
               (i32.and
                (i32.load8_u offset=32
                 (i32.const 0)
                )
                (i32.const 255)
               )
               (i32.const 2)
              )
             )
             (block $label$19
              (br_if $label$19
               (i32.eq
                (i32.load8_u
                 (i32.add
                  (get_local $0)
                  (i32.load8_u
                   (i32.add
                    (get_local $14)
                    (i32.const 43)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
              (br_if $label$17
               (i32.ne
                (i32.load8_u
                 (i32.add
                  (get_local $0)
                  (i32.load8_u
                   (i32.add
                    (get_local $14)
                    (i32.const 49)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
             )
             (br_if $label$14
              (i32.ge_u
               (tee_local $2
                (i32.and
                 (get_local $25)
                 (i32.const 255)
                )
               )
               (tee_local $17
                (i32.and
                 (get_local $21)
                 (i32.const 255)
                )
               )
              )
             )
             (loop $label$20
              (i32.store16
               (i32.add
                (i32.shl
                 (i32.load8_u
                  (i32.add
                   (get_local $2)
                   (i32.const 85728)
                  )
                 )
                 (i32.const 1)
                )
                (get_local $4)
               )
               (i32.or
                (i32.shl
                 (i32.sub
                  (get_local $19)
                  (i32.load8_u
                   (i32.add
                    (get_local $2)
                    (i32.const 85744)
                   )
                  )
                 )
                 (i32.const 5)
                )
                (i32.const 28)
               )
              )
              (br_if $label$20
               (i32.ne
                (get_local $17)
                (tee_local $2
                 (i32.add
                  (get_local $2)
                  (i32.const 1)
                 )
                )
               )
              )
              (br $label$14)
             )
            )
            (br_if $label$16
             (i32.ne
              (get_local $1)
              (i32.const 1)
             )
            )
            (br_if $label$16
             (i32.ne
              (i32.and
               (i32.load8_u offset=32
                (i32.const 0)
               )
               (i32.const 255)
              )
              (i32.const 2)
             )
            )
            (br_if $label$14
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $0)
                (i32.load8_u
                 (i32.add
                  (get_local $14)
                  (i32.const 43)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (br_if $label$14
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $0)
                (i32.load8_u
                 (i32.add
                  (get_local $14)
                  (i32.const 49)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (br_if $label$15
             (i32.lt_u
              (i32.and
               (get_local $25)
               (i32.const 255)
              )
              (i32.and
               (get_local $21)
               (i32.const 255)
              )
             )
            )
            (br $label$14)
           )
           (br_if $label$14
            (i32.ge_u
             (tee_local $2
              (i32.and
               (get_local $25)
               (i32.const 255)
              )
             )
             (tee_local $17
              (i32.and
               (get_local $21)
               (i32.const 255)
              )
             )
            )
           )
           (loop $label$21
            (i32.store16
             (i32.add
              (i32.shl
               (i32.load8_u
                (i32.add
                 (get_local $2)
                 (i32.const 85728)
                )
               )
               (i32.const 1)
              )
              (get_local $4)
             )
             (i32.or
              (i32.shl
               (i32.sub
                (get_local $19)
                (i32.load8_u
                 (i32.add
                  (get_local $2)
                  (i32.const 85744)
                 )
                )
               )
               (i32.const 5)
              )
              (i32.const 10)
             )
            )
            (br_if $label$21
             (i32.ne
              (get_local $17)
              (tee_local $2
               (i32.add
                (get_local $2)
                (i32.const 1)
               )
              )
             )
            )
            (br $label$14)
           )
          )
          (br_if $label$14
           (i32.ge_u
            (i32.and
             (get_local $25)
             (i32.const 255)
            )
            (i32.and
             (get_local $21)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $15
          (i32.and
           (get_local $21)
           (i32.const 255)
          )
         )
         (set_local $17
          (i32.and
           (get_local $25)
           (i32.const 255)
          )
         )
         (loop $label$22
          (block $label$23
           (br_if $label$23
            (i32.gt_u
             (i32.and
              (tee_local $2
               (i32.load16_u
                (tee_local $16
                 (i32.add
                  (i32.shl
                   (i32.load8_u
                    (i32.add
                     (get_local $17)
                     (i32.const 85728)
                    )
                   )
                   (i32.const 1)
                  )
                  (get_local $4)
                 )
                )
               )
              )
              (i32.const 8)
             )
             (i32.const 7)
            )
           )
           (i32.store16
            (get_local $16)
            (tee_local $2
             (i32.or
              (i32.shl
               (i32.sub
                (get_local $19)
                (i32.load8_u
                 (i32.add
                  (get_local $17)
                  (i32.const 85744)
                 )
                )
               )
               (i32.const 5)
              )
              (i32.const 32776)
             )
            )
           )
          )
          (block $label$24
           (br_if $label$24
            (i32.ne
             (i32.and
              (get_local $2)
              (i32.const 14)
             )
             (i32.const 8)
            )
           )
           (block $label$25
            (br_if $label$25
             (i32.eqz
              (i32.and
               (tee_local $22
                (i32.and
                 (get_local $2)
                 (i32.const 65535)
                )
               )
               (i32.const 32768)
              )
             )
            )
            (i32.store16
             (get_local $16)
             (tee_local $2
              (i32.add
               (get_local $22)
               (i32.const 4096)
              )
             )
            )
           )
           (i32.store16
            (get_local $16)
            (tee_local $22
             (i32.and
              (get_local $2)
              (i32.const 32767)
             )
            )
           )
           (block $label$26
            (br_if $label$26
             (i32.eqz
              (i32.and
               (get_local $2)
               (i32.const 2048)
              )
             )
            )
            (i32.store16
             (get_local $16)
             (tee_local $22
              (i32.or
               (i32.shl
                (i32.sub
                 (get_local $19)
                 (i32.load8_u
                  (i32.add
                   (get_local $17)
                   (i32.const 85744)
                  )
                 )
                )
                (i32.const 5)
               )
               (i32.and
                (i32.add
                 (get_local $22)
                 (i32.const 256)
                )
                (i32.const 65311)
               )
              )
             )
            )
           )
           (i32.store16
            (get_local $16)
            (i32.or
             (get_local $22)
             (i32.const 2048)
            )
           )
          )
          (br_if $label$22
           (i32.ne
            (get_local $15)
            (tee_local $17
             (i32.add
              (get_local $17)
              (i32.const 1)
             )
            )
           )
          )
         )
        )
        (block $label$27
         (br_if $label$27
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.load8_u
              (i32.add
               (get_local $14)
               (i32.const 44)
              )
             )
            )
           )
          )
         )
         (set_local $23
          (i32.add
           (get_local $23)
           (i32.const -1)
          )
         )
         (br_if $label$13
          (i32.ge_u
           (tee_local $2
            (i32.and
             (get_local $25)
             (i32.const 255)
            )
           )
           (tee_local $19
            (i32.and
             (get_local $21)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$28
          (i32.store16
           (tee_local $17
            (i32.add
             (i32.shl
              (i32.load8_u
               (i32.add
                (get_local $2)
                (i32.const 85728)
               )
              )
              (i32.const 1)
             )
             (get_local $4)
            )
           )
           (i32.and
            (i32.load16_u
             (get_local $17)
            )
            (i32.const 63487)
           )
          )
          (br_if $label$28
           (i32.ne
            (get_local $19)
            (tee_local $2
             (i32.add
              (get_local $2)
              (i32.const 1)
             )
            )
           )
          )
          (br $label$13)
         )
        )
        (set_local $24
         (i32.add
          (get_local $24)
          (i32.const -1)
         )
        )
        (br_if $label$13
         (i32.ge_u
          (tee_local $2
           (i32.and
            (tee_local $25
             (i32.add
              (get_local $25)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
          )
          (tee_local $16
           (i32.and
            (get_local $21)
            (i32.const 255)
           )
          )
         )
        )
        (set_local $2
         (i32.add
          (get_local $2)
          (i32.const 85728)
         )
        )
        (set_local $17
         (get_local $25)
        )
        (loop $label$29
         (i32.store16
          (tee_local $19
           (i32.add
            (i32.shl
             (i32.load8_u
              (get_local $2)
             )
             (i32.const 1)
            )
            (get_local $4)
           )
          )
          (i32.or
           (i32.load16_u
            (get_local $19)
           )
           (i32.const 32768)
          )
         )
         (set_local $2
          (i32.add
           (get_local $2)
           (i32.const 1)
          )
         )
         (br_if $label$29
          (i32.lt_u
           (i32.and
            (tee_local $17
             (i32.add
              (get_local $17)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
           (get_local $16)
          )
         )
        )
       )
       (br_if $label$10
        (i32.gt_u
         (get_local $12)
         (tee_local $19
          (i32.and
           (tee_local $20
            (i32.add
             (get_local $20)
             (i32.const 1)
            )
           )
           (i32.const 255)
          )
         )
        )
       )
      )
     )
     (br_if $label$4
      (i32.gt_u
       (get_local $8)
       (tee_local $2
        (i32.and
         (tee_local $18
          (i32.add
           (get_local $18)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
    )
   )
   (set_local $22
    (i32.shl
     (get_local $5)
     (i32.const 12)
    )
   )
   (block $label$30
    (block $label$31
     (br_if $label$31
      (i32.ne
       (get_local $1)
       (i32.const 1)
      )
     )
     (set_local $2
      (i32.const 0)
     )
     (set_local $17
      (i32.const 0)
     )
     (loop $label$32
      (block $label$33
       (block $label$34
        (br_if $label$34
         (i32.eq
          (tee_local $16
           (i32.and
            (tee_local $19
             (i32.load16_u
              (tee_local $24
               (i32.add
                (get_local $2)
                (get_local $4)
               )
              )
             )
            )
            (i32.const 14)
           )
          )
          (i32.const 10)
         )
        )
        (br_if $label$33
         (i32.ne
          (get_local $16)
          (i32.const 8)
         )
        )
        (i32.store16
         (get_local $24)
         (tee_local $19
          (i32.or
           (i32.ne
            (i32.and
             (get_local $19)
             (i32.const 1792)
            )
            (i32.const 0)
           )
           (get_local $19)
          )
         )
        )
        (br_if $label$33
         (i32.le_u
          (i32.and
           (get_local $19)
           (i32.const 31)
          )
          (i32.and
           (i32.load16_u
            (tee_local $16
             (i32.add
              (get_local $3)
              (get_local $2)
             )
            )
           )
           (i32.const 31)
          )
         )
        )
        (block $label$35
         (br_if $label$35
          (i32.eq
           (i32.load8_u offset=32
            (i32.const 0)
           )
           (i32.const 2)
          )
         )
         (i32.store16
          (get_local $16)
          (i32.or
           (i32.and
            (get_local $19)
            (i32.const 36863)
           )
           (get_local $22)
          )
         )
         (br $label$33)
        )
        (i32.store16
         (get_local $16)
         (i32.or
          (i32.or
           (i32.shl
            (call $_Z6isFoulhPc
             (i32.and
              (get_local $17)
              (i32.const 255)
             )
             (get_local $0)
            )
            (i32.const 4)
           )
           (get_local $22)
          )
          (i32.and
           (i32.load16_u
            (get_local $24)
           )
           (i32.const 36863)
          )
         )
        )
        (br $label$33)
       )
       (i32.store16
        (i32.add
         (get_local $3)
         (get_local $2)
        )
        (i32.or
         (i32.and
          (get_local $19)
          (i32.const 36863)
         )
         (get_local $22)
        )
       )
      )
      (set_local $2
       (i32.add
        (get_local $2)
        (i32.const 2)
       )
      )
      (br_if $label$32
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
      (br $label$30)
     )
    )
    (set_local $2
     (i32.const 0)
    )
    (loop $label$36
     (block $label$37
      (block $label$38
       (br_if $label$38
        (i32.eq
         (tee_local $19
          (i32.and
           (tee_local $17
            (i32.load16_u
             (tee_local $16
              (i32.add
               (get_local $2)
               (get_local $4)
              )
             )
            )
           )
           (i32.const 14)
          )
         )
         (i32.const 8)
        )
       )
       (br_if $label$37
        (i32.ne
         (get_local $19)
         (i32.const 10)
        )
       )
       (i32.store16
        (i32.add
         (get_local $3)
         (get_local $2)
        )
        (i32.or
         (i32.and
          (get_local $17)
          (i32.const 36863)
         )
         (get_local $22)
        )
       )
       (br $label$37)
      )
      (i32.store16
       (get_local $16)
       (tee_local $17
        (i32.or
         (i32.ne
          (i32.and
           (get_local $17)
           (i32.const 1792)
          )
          (i32.const 0)
         )
         (get_local $17)
        )
       )
      )
      (br_if $label$37
       (i32.le_u
        (i32.and
         (get_local $17)
         (i32.const 31)
        )
        (i32.and
         (i32.load16_u
          (tee_local $19
           (i32.add
            (get_local $3)
            (get_local $2)
           )
          )
         )
         (i32.const 31)
        )
       )
      )
      (i32.store16
       (get_local $19)
       (i32.or
        (i32.and
         (get_local $17)
         (i32.const 36863)
        )
        (get_local $22)
       )
      )
     )
     (br_if $label$36
      (i32.ne
       (tee_local $2
        (i32.add
         (get_local $2)
         (i32.const 2)
        )
       )
       (i32.const 450)
      )
     )
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $5
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (i32.const 4)
    )
   )
  )
 )
 (func $_Z9testThreePccPt (; 23 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 f64)
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
  (local $24 i32)
  (local $25 i32)
  (local $26 i32)
  (local $27 i32)
  (local $28 i32)
  (local $29 i32)
  (i64.store offset=85728 align=1
   (i32.const 0)
   (i64.const 0)
  )
  (i64.store offset=85748 align=1
   (i32.const 0)
   (i64.const 0)
  )
  (i32.store8 offset=85742
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store16 offset=85740 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=85736 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store8 offset=85758
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store16 offset=85756 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=85744 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $3
   (call $memset
    (get_local $2)
    (i32.const 0)
    (i32.const 450)
   )
  )
  (set_local $5
   (i32.const 0)
  )
  (loop $label$0
   (set_local $4
    (call $memset
     (i32.const 85760)
     (i32.const 0)
     (i32.const 450)
    )
   )
   (set_local $7
    (i32.and
     (tee_local $24
      (select
       (i32.sub
        (i32.const 15)
        (tee_local $6
         (i32.load8_u offset=16
          (i32.const 0)
         )
        )
       )
       (i32.const 0)
       (i32.eq
        (get_local $5)
        (i32.const 2)
       )
      )
     )
     (i32.const 255)
    )
   )
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.ge_u
       (get_local $5)
       (i32.const 2)
      )
     )
     (set_local $2
      (i32.add
       (get_local $7)
       (get_local $6)
      )
     )
     (br $label$1)
    )
    (set_local $2
     (i32.add
      (i32.add
       (i32.shl
        (get_local $6)
        (i32.const 1)
       )
       (get_local $7)
      )
      (i32.const -5)
     )
    )
   )
   (block $label$3
    (br_if $label$3
     (i32.le_u
      (tee_local $8
       (i32.and
        (get_local $2)
        (i32.const 255)
       )
      )
      (get_local $7)
     )
    )
    (set_local $11
     (i32.shl
      (get_local $6)
      (i32.const 1)
     )
    )
    (set_local $10
     (i32.sub
      (i32.const 1)
      (get_local $7)
     )
    )
    (set_local $9
     (i32.mul
      (get_local $5)
      (i32.const 29)
     )
    )
    (set_local $2
     (get_local $7)
    )
    (loop $label$4
     (set_local $25
      (i32.const 14)
     )
     (block $label$5
      (br_if $label$5
       (i32.lt_u
        (get_local $5)
        (i32.const 3)
       )
      )
      (br_if $label$5
       (i32.lt_u
        (tee_local $22
         (i32.and
          (get_local $24)
          (i32.const 255)
         )
        )
        (get_local $6)
       )
      )
      (set_local $25
       (i32.sub
        (select
         (i32.add
          (get_local $2)
          (i32.const 15)
         )
         (i32.const 29)
         (i32.lt_u
          (get_local $22)
          (i32.const 15)
         )
        )
        (get_local $6)
       )
      )
     )
     (set_local $22
      (i32.and
       (get_local $25)
       (i32.const 255)
      )
     )
     (block $label$6
      (block $label$7
       (br_if $label$7
        (i32.gt_u
         (get_local $5)
         (i32.const 1)
        )
       )
       (set_local $23
        (i32.add
         (get_local $22)
         (get_local $6)
        )
       )
       (br $label$6)
      )
      (block $label$8
       (br_if $label$8
        (i32.ge_s
         (tee_local $23
          (i32.sub
           (get_local $2)
           (get_local $7)
          )
         )
         (get_local $6)
        )
       )
       (set_local $23
        (i32.add
         (i32.add
          (get_local $10)
          (get_local $2)
         )
         (get_local $22)
        )
       )
       (br $label$6)
      )
      (set_local $23
       (i32.add
        (i32.add
         (get_local $22)
         (i32.xor
          (get_local $23)
          (i32.const -1)
         )
        )
        (get_local $11)
       )
      )
     )
     (block $label$9
      (br_if $label$9
       (i32.le_u
        (tee_local $13
         (i32.and
          (get_local $23)
          (i32.const 255)
         )
        )
        (get_local $22)
       )
      )
      (set_local $14
       (i32.mul
        (i32.add
         (get_local $2)
         (get_local $9)
        )
        (i32.const 43)
       )
      )
      (set_local $29
       (i32.const 0)
      )
      (set_local $26
       (i32.const 0)
      )
      (set_local $28
       (i32.const 0)
      )
      (set_local $27
       (i32.const 0)
      )
      (loop $label$10
       (block $label$11
        (block $label$12
         (br_if $label$12
          (i32.eqz
           (tee_local $2
            (i32.load8_u
             (i32.add
              (get_local $0)
              (tee_local $23
               (i32.load8_u
                (i32.add
                 (tee_local $15
                  (i32.add
                   (get_local $22)
                   (get_local $14)
                  )
                 )
                 (i32.const 48)
                )
               )
              )
             )
            )
           )
          )
         )
         (set_local $27
          (select
           (i32.add
            (get_local $27)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $2
            (i32.eq
             (get_local $2)
             (i32.and
              (get_local $1)
              (i32.const 255)
             )
            )
           )
          )
         )
         (set_local $29
          (select
           (get_local $29)
           (i32.const 0)
           (get_local $2)
          )
         )
         (set_local $28
          (select
           (get_local $28)
           (get_local $26)
           (get_local $2)
          )
         )
         (br $label$11)
        )
        (i32.store8
         (i32.add
          (tee_local $2
           (i32.and
            (get_local $26)
            (i32.const 255)
           )
          )
          (i32.const 85728)
         )
         (get_local $23)
        )
        (i32.store8
         (i32.add
          (get_local $2)
          (i32.const 85744)
         )
         (get_local $25)
        )
        (set_local $26
         (i32.add
          (get_local $26)
          (i32.const 1)
         )
        )
        (set_local $29
         (i32.add
          (get_local $29)
          (i32.const 1)
         )
        )
       )
       (block $label$13
        (br_if $label$13
         (i32.ne
          (i32.add
           (i32.and
            (get_local $29)
            (i32.const 255)
           )
           (tee_local $16
            (i32.and
             (get_local $27)
             (i32.const 255)
            )
           )
          )
          (i32.const 5)
         )
        )
        (block $label$14
         (block $label$15
          (block $label$16
           (block $label$17
            (block $label$18
             (br_if $label$18
              (i32.ne
               (get_local $16)
               (i32.const 4)
              )
             )
             (br_if $label$17
              (i32.ne
               (get_local $1)
               (i32.const 1)
              )
             )
             (br_if $label$17
              (i32.ne
               (i32.and
                (i32.load8_u offset=32
                 (i32.const 0)
                )
                (i32.const 255)
               )
               (i32.const 2)
              )
             )
             (block $label$19
              (br_if $label$19
               (i32.eq
                (i32.load8_u
                 (i32.add
                  (get_local $0)
                  (i32.load8_u
                   (i32.add
                    (get_local $15)
                    (i32.const 43)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
              (br_if $label$17
               (i32.ne
                (i32.load8_u
                 (i32.add
                  (get_local $0)
                  (i32.load8_u
                   (i32.add
                    (get_local $15)
                    (i32.const 49)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
             )
             (br_if $label$14
              (i32.ge_u
               (tee_local $2
                (i32.and
                 (get_local $28)
                 (i32.const 255)
                )
               )
               (tee_local $23
                (i32.and
                 (get_local $26)
                 (i32.const 255)
                )
               )
              )
             )
             (loop $label$20
              (i32.store16
               (i32.add
                (i32.shl
                 (i32.load8_u
                  (i32.add
                   (get_local $2)
                   (i32.const 85728)
                  )
                 )
                 (i32.const 1)
                )
                (get_local $4)
               )
               (i32.or
                (i32.shl
                 (i32.sub
                  (get_local $22)
                  (i32.load8_u
                   (i32.add
                    (get_local $2)
                    (i32.const 85744)
                   )
                  )
                 )
                 (i32.const 5)
                )
                (i32.const 28)
               )
              )
              (br_if $label$20
               (i32.ne
                (get_local $23)
                (tee_local $2
                 (i32.add
                  (get_local $2)
                  (i32.const 1)
                 )
                )
               )
              )
              (br $label$14)
             )
            )
            (br_if $label$14
             (i32.ne
              (i32.and
               (get_local $27)
               (i32.const 254)
              )
              (i32.const 2)
             )
            )
            (br_if $label$16
             (i32.ne
              (get_local $1)
              (i32.const 1)
             )
            )
            (br_if $label$16
             (i32.ne
              (i32.and
               (i32.load8_u offset=32
                (i32.const 0)
               )
               (i32.const 255)
              )
              (i32.const 2)
             )
            )
            (br_if $label$14
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $0)
                (i32.load8_u
                 (i32.add
                  (get_local $15)
                  (i32.const 43)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (br_if $label$14
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $0)
                (i32.load8_u
                 (i32.add
                  (get_local $15)
                  (i32.const 49)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (br_if $label$15
             (i32.lt_u
              (i32.and
               (get_local $28)
               (i32.const 255)
              )
              (i32.and
               (get_local $26)
               (i32.const 255)
              )
             )
            )
            (br $label$14)
           )
           (br_if $label$14
            (i32.ge_u
             (tee_local $2
              (i32.and
               (get_local $28)
               (i32.const 255)
              )
             )
             (tee_local $23
              (i32.and
               (get_local $26)
               (i32.const 255)
              )
             )
            )
           )
           (loop $label$21
            (i32.store16
             (i32.add
              (i32.shl
               (i32.load8_u
                (i32.add
                 (get_local $2)
                 (i32.const 85728)
                )
               )
               (i32.const 1)
              )
              (get_local $4)
             )
             (i32.or
              (i32.shl
               (i32.sub
                (get_local $22)
                (i32.load8_u
                 (i32.add
                  (get_local $2)
                  (i32.const 85744)
                 )
                )
               )
               (i32.const 5)
              )
              (i32.const 10)
             )
            )
            (br_if $label$21
             (i32.ne
              (get_local $23)
              (tee_local $2
               (i32.add
                (get_local $2)
                (i32.const 1)
               )
              )
             )
            )
            (br $label$14)
           )
          )
          (br_if $label$14
           (i32.ge_u
            (i32.and
             (get_local $28)
             (i32.const 255)
            )
            (i32.and
             (get_local $26)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $19
          (i32.and
           (get_local $26)
           (i32.const 255)
          )
         )
         (set_local $2
          (i32.and
           (get_local $28)
           (i32.const 255)
          )
         )
         (set_local $18
          (i32.shl
           (tee_local $17
            (i32.add
             (get_local $16)
             (i32.const 1)
            )
           )
           (i32.const 1)
          )
         )
         (loop $label$22
          (block $label$23
           (br_if $label$23
            (i32.gt_u
             (i32.shr_u
              (i32.and
               (tee_local $23
                (i32.load16_u
                 (tee_local $20
                  (i32.add
                   (i32.shl
                    (i32.load8_u
                     (i32.add
                      (get_local $2)
                      (i32.const 85728)
                     )
                    )
                    (i32.const 1)
                   )
                   (get_local $4)
                  )
                 )
                )
               )
               (i32.const 14)
              )
              (i32.const 1)
             )
             (get_local $16)
            )
           )
           (i32.store16
            (get_local $20)
            (tee_local $23
             (i32.or
              (i32.or
               (get_local $18)
               (i32.shl
                (i32.sub
                 (get_local $22)
                 (i32.load8_u
                  (i32.add
                   (get_local $2)
                   (i32.const 85744)
                  )
                 )
                )
                (i32.const 5)
               )
              )
              (i32.const 32768)
             )
            )
           )
          )
          (block $label$24
           (br_if $label$24
            (i32.ne
             (i32.and
              (i32.shr_u
               (tee_local $21
                (i32.and
                 (get_local $23)
                 (i32.const 65535)
                )
               )
               (i32.const 1)
              )
              (i32.const 7)
             )
             (get_local $17)
            )
           )
           (block $label$25
            (br_if $label$25
             (i32.eqz
              (i32.and
               (get_local $21)
               (i32.const 32768)
              )
             )
            )
            (i32.store16
             (get_local $20)
             (tee_local $23
              (i32.add
               (get_local $21)
               (i32.const 4096)
              )
             )
            )
           )
           (i32.store16
            (get_local $20)
            (tee_local $21
             (i32.and
              (get_local $23)
              (i32.const 32767)
             )
            )
           )
           (block $label$26
            (br_if $label$26
             (i32.eqz
              (i32.and
               (get_local $23)
               (i32.const 2048)
              )
             )
            )
            (i32.store16
             (get_local $20)
             (tee_local $21
              (i32.or
               (i32.shl
                (i32.sub
                 (get_local $22)
                 (i32.load8_u
                  (i32.add
                   (get_local $2)
                   (i32.const 85744)
                  )
                 )
                )
                (i32.const 5)
               )
               (i32.and
                (i32.add
                 (get_local $21)
                 (i32.const 256)
                )
                (i32.const 65311)
               )
              )
             )
            )
           )
           (i32.store16
            (get_local $20)
            (i32.or
             (get_local $21)
             (i32.const 2048)
            )
           )
          )
          (br_if $label$22
           (i32.ne
            (get_local $19)
            (tee_local $2
             (i32.add
              (get_local $2)
              (i32.const 1)
             )
            )
           )
          )
         )
        )
        (block $label$27
         (br_if $label$27
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.load8_u
              (i32.add
               (get_local $15)
               (i32.const 44)
              )
             )
            )
           )
          )
         )
         (set_local $27
          (i32.add
           (get_local $27)
           (i32.const -1)
          )
         )
         (br_if $label$13
          (i32.ge_u
           (tee_local $2
            (i32.and
             (get_local $28)
             (i32.const 255)
            )
           )
           (tee_local $23
            (i32.and
             (get_local $26)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$28
          (i32.store16
           (tee_local $22
            (i32.add
             (i32.shl
              (i32.load8_u
               (i32.add
                (get_local $2)
                (i32.const 85728)
               )
              )
              (i32.const 1)
             )
             (get_local $4)
            )
           )
           (i32.and
            (i32.load16_u
             (get_local $22)
            )
            (i32.const 63487)
           )
          )
          (br_if $label$28
           (i32.ne
            (get_local $23)
            (tee_local $2
             (i32.add
              (get_local $2)
              (i32.const 1)
             )
            )
           )
          )
          (br $label$13)
         )
        )
        (set_local $29
         (i32.add
          (get_local $29)
          (i32.const -1)
         )
        )
        (br_if $label$13
         (i32.ge_u
          (tee_local $2
           (i32.and
            (tee_local $28
             (i32.add
              (get_local $28)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
          )
          (tee_local $20
           (i32.and
            (get_local $26)
            (i32.const 255)
           )
          )
         )
        )
        (set_local $2
         (i32.add
          (get_local $2)
          (i32.const 85728)
         )
        )
        (set_local $22
         (get_local $28)
        )
        (loop $label$29
         (i32.store16
          (tee_local $23
           (i32.add
            (i32.shl
             (i32.load8_u
              (get_local $2)
             )
             (i32.const 1)
            )
            (get_local $4)
           )
          )
          (i32.or
           (i32.load16_u
            (get_local $23)
           )
           (i32.const 32768)
          )
         )
         (set_local $2
          (i32.add
           (get_local $2)
           (i32.const 1)
          )
         )
         (br_if $label$29
          (i32.lt_u
           (i32.and
            (tee_local $22
             (i32.add
              (get_local $22)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
           (get_local $20)
          )
         )
        )
       )
       (br_if $label$10
        (i32.gt_u
         (get_local $13)
         (tee_local $22
          (i32.and
           (tee_local $25
            (i32.add
             (get_local $25)
             (i32.const 1)
            )
           )
           (i32.const 255)
          )
         )
        )
       )
      )
     )
     (br_if $label$4
      (i32.gt_u
       (get_local $8)
       (tee_local $2
        (i32.and
         (tee_local $24
          (i32.add
           (get_local $24)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
    )
   )
   (set_local $16
    (i32.or
     (get_local $5)
     (i32.const 56)
    )
   )
   (set_local $27
    (i32.shl
     (get_local $5)
     (i32.const 12)
    )
   )
   (set_local $12
    (f64.convert_u/i32
     (i32.and
      (get_local $5)
      (i32.const 255)
     )
    )
   )
   (set_local $2
    (i32.const 0)
   )
   (loop $label$30
    (block $label$31
     (block $label$32
      (br_if $label$32
       (i32.ne
        (tee_local $20
         (i32.and
          (i32.shr_u
           (tee_local $22
            (i32.load16_u
             (tee_local $29
              (i32.add
               (tee_local $23
                (i32.shl
                 (get_local $2)
                 (i32.const 1)
                )
               )
               (get_local $4)
              )
             )
            )
           )
           (i32.const 1)
          )
          (i32.const 7)
         )
        )
        (i32.const 5)
       )
      )
      (i32.store16
       (i32.add
        (get_local $3)
        (get_local $23)
       )
       (i32.or
        (i32.and
         (get_local $22)
         (i32.const 36863)
        )
        (get_local $27)
       )
      )
      (br $label$31)
     )
     (br_if $label$31
      (i32.gt_u
       (i32.add
        (get_local $20)
        (i32.const -3)
       )
       (i32.const 1)
      )
     )
     (i32.store16
      (get_local $29)
      (tee_local $22
       (i32.or
        (i32.ne
         (i32.and
          (get_local $22)
          (i32.const 1792)
         )
         (i32.const 0)
        )
        (get_local $22)
       )
      )
     )
     (br_if $label$31
      (i32.le_u
       (i32.and
        (get_local $22)
        (i32.const 31)
       )
       (i32.and
        (i32.load16_u
         (tee_local $25
          (i32.add
           (get_local $3)
           (get_local $23)
          )
         )
        )
        (i32.const 31)
       )
      )
     )
     (block $label$33
      (block $label$34
       (block $label$35
        (block $label$36
         (br_if $label$36
          (i32.ne
           (get_local $1)
           (i32.const 1)
          )
         )
         (br_if $label$36
          (i32.ne
           (i32.and
            (i32.load8_u offset=32
             (i32.const 0)
            )
            (i32.const 255)
           )
           (i32.const 2)
          )
         )
         (set_local $28
          (call $_Z6isFoulhPc
           (tee_local $15
            (i32.and
             (get_local $2)
             (i32.const 255)
            )
           )
           (get_local $0)
          )
         )
         (br_if $label$33
          (i32.ne
           (get_local $20)
           (i32.const 3)
          )
         )
         (br_if $label$33
          (i32.or
           (get_local $28)
           (i32.eqz
            (i32.and
             (i32.load8_u
              (get_local $29)
             )
             (i32.const 1)
            )
           )
          )
         )
         (i32.store8
          (tee_local $19
           (i32.add
            (get_local $0)
            (get_local $2)
           )
          )
          (i32.const 1)
         )
         (set_local $23
          (i32.const 0)
         )
         (i32.store offset=85712
          (i32.const 0)
          (i32.const 0)
         )
         (set_local $20
          (i32.mul
           (get_local $2)
           (i32.const 29)
          )
         )
         (set_local $26
          (i32.and
           (i32.shr_u
            (tee_local $17
             (i32.and
              (i32.load16_u
               (get_local $29)
              )
              (i32.const 36863)
             )
            )
            (i32.const 5)
           )
           (i32.const 7)
          )
         )
         (block $label$37
          (loop $label$38
           (br_if $label$37
            (i32.lt_s
             (i32.shr_s
              (i32.shl
               (get_local $23)
               (i32.const 24)
              )
              (i32.const 24)
             )
             (i32.const -4)
            )
           )
           (set_local $21
            (i32.add
             (get_local $26)
             (get_local $23)
            )
           )
           (set_local $23
            (tee_local $22
             (i32.add
              (get_local $23)
              (i32.const -1)
             )
            )
           )
           (br_if $label$38
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.load8_u
               (i32.add
                (i32.add
                 (i32.shl
                  (i32.add
                   (i32.shr_s
                    (i32.shl
                     (get_local $21)
                     (i32.const 24)
                    )
                    (i32.const 24)
                   )
                   (get_local $20)
                  )
                  (i32.const 2)
                 )
                 (get_local $16)
                )
                (i32.const 5040)
               )
              )
             )
            )
           )
          )
          (loop $label$39
           (block $label$40
            (br_if $label$40
             (i32.load8_u
              (i32.add
               (get_local $0)
               (tee_local $23
                (i32.load8_u
                 (i32.add
                  (i32.add
                   (i32.shl
                    (i32.add
                     (i32.shr_s
                      (i32.shl
                       (i32.add
                        (get_local $26)
                        (get_local $22)
                       )
                       (i32.const 24)
                      )
                      (i32.const 24)
                     )
                     (get_local $20)
                    )
                    (i32.const 2)
                   )
                   (get_local $16)
                  )
                  (i32.const 5040)
                 )
                )
               )
              )
             )
            )
            (i32.store8 offset=85712
             (i32.const 0)
             (tee_local $21
              (i32.add
               (i32.load8_u offset=85712
                (i32.const 0)
               )
               (i32.const 1)
              )
             )
            )
            (i32.store8
             (i32.add
              (i32.and
               (get_local $21)
               (i32.const 255)
              )
              (i32.const 85712)
             )
             (get_local $23)
            )
           )
           (set_local $23
            (i32.shl
             (get_local $22)
             (i32.const 24)
            )
           )
           (set_local $22
            (i32.add
             (get_local $22)
             (i32.const -1)
            )
           )
           (br_if $label$39
            (i32.gt_s
             (i32.shr_s
              (get_local $23)
              (i32.const 24)
             )
             (i32.const -5)
            )
           )
          )
         )
         (i32.store8 offset=85712
          (i32.const 0)
          (i32.and
           (i32.shr_u
            (get_local $17)
            (i32.const 8)
           )
           (i32.const 7)
          )
         )
         (i32.store offset=85716
          (i32.const 0)
          (i32.load offset=85712
           (i32.const 0)
          )
         )
         (call $_Z3logd
          (f64.convert_u/i32
           (get_local $15)
          )
         )
         (call $_Z3logd
          (get_local $12)
         )
         (call $_Z3logd
          (f64.convert_s/i32
           (i32.shr_u
            (i32.and
             (i32.load16_u
              (get_local $29)
             )
             (i32.const 224)
            )
            (i32.const 5)
           )
          )
         )
         (call $_Z3logd
          (f64.convert_u/i32
           (i32.load offset=85716
            (i32.const 0)
           )
          )
         )
         (call $_Z3logd
          (f64.convert_u/i32
           (i32.load8_u offset=85716
            (i32.const 0)
           )
          )
         )
         (call $_Z3logd
          (f64.convert_u/i32
           (i32.load8_u offset=85717
            (i32.const 0)
           )
          )
         )
         (call $_Z3logd
          (f64.convert_u/i32
           (i32.load8_u offset=85718
            (i32.const 0)
           )
          )
         )
         (br_if $label$35
          (i32.eqz
           (i32.load8_u offset=85716
            (i32.const 0)
           )
          )
         )
         (set_local $22
          (i32.const 1)
         )
         (loop $label$41
          (call $_Z3logd
           (f64.convert_u/i32
            (tee_local $23
             (call $_Z6isFoulhPc
              (i32.load8_u
               (i32.add
                (i32.and
                 (get_local $22)
                 (i32.const 255)
                )
                (i32.const 85716)
               )
              )
              (get_local $0)
             )
            )
           )
          )
          (br_if $label$34
           (i32.eqz
            (get_local $23)
           )
          )
          (br_if $label$41
           (i32.le_u
            (i32.and
             (tee_local $22
              (i32.add
               (get_local $22)
               (i32.const 1)
              )
             )
             (i32.const 255)
            )
            (i32.load8_u offset=85716
             (i32.const 0)
            )
           )
          )
          (br $label$34)
         )
        )
        (i32.store16
         (get_local $25)
         (i32.or
          (i32.and
           (get_local $22)
           (i32.const 36863)
          )
          (get_local $27)
         )
        )
        (br $label$31)
       )
       (set_local $22
        (i32.const 1)
       )
      )
      (i32.store8
       (get_local $19)
       (i32.const 0)
      )
      (br_if $label$33
       (i32.le_u
        (i32.and
         (get_local $22)
         (i32.const 255)
        )
        (i32.load8_u offset=85716
         (i32.const 0)
        )
       )
      )
      (i32.store16
       (get_local $29)
       (i32.and
        (i32.load16_u
         (get_local $29)
        )
        (i32.const 63742)
       )
      )
     )
     (i32.store16
      (get_local $25)
      (i32.or
       (i32.or
        (i32.shl
         (get_local $28)
         (i32.const 4)
        )
        (get_local $27)
       )
       (i32.and
        (i32.load16_u
         (get_local $29)
        )
        (i32.const 36863)
       )
      )
     )
    )
    (br_if $label$30
     (i32.ne
      (tee_local $2
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
      )
      (i32.const 225)
     )
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $5
      (i32.add
       (get_local $5)
       (i32.const 1)
      )
     )
     (i32.const 4)
    )
   )
  )
 )
 (func $_Z8getLevelPcc (; 24 ;) (param $0 i32) (param $1 i32) (result i32)
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
  (local $24 i32)
  (local $25 i32)
  (drop
   (call $memset
    (i32.const 86224)
    (i32.const 0)
    (i32.const 450)
   )
  )
  (i64.store offset=85728 align=1
   (i32.const 0)
   (i64.const 0)
  )
  (i64.store offset=85748 align=1
   (i32.const 0)
   (i64.const 0)
  )
  (i32.store8 offset=85742
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store16 offset=85740 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=85736 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store8 offset=85758
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store16 offset=85756 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store offset=85744 align=1
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $5
   (i32.add
    (tee_local $3
     (i32.load8_u offset=16
      (i32.const 0)
     )
    )
    (i32.const 14)
   )
  )
  (set_local $4
   (i32.sub
    (i32.const 15)
    (get_local $3)
   )
  )
  (set_local $7
   (i32.add
    (tee_local $6
     (i32.shl
      (get_local $3)
      (i32.const 1)
     )
    )
    (i32.const -5)
   )
  )
  (set_local $14
   (i32.const 0)
  )
  (set_local $15
   (i32.const 0)
  )
  (loop $label$0
   (set_local $2
    (call $memset
     (i32.const 85760)
     (i32.const 0)
     (i32.const 450)
    )
   )
   (block $label$1
    (br_if $label$1
     (i32.le_u
      (tee_local $10
       (i32.and
        (tee_local $9
         (i32.add
          (tee_local $16
           (select
            (get_local $4)
            (i32.const 0)
            (i32.eq
             (tee_local $22
              (i32.and
               (get_local $15)
               (i32.const 255)
              )
             )
             (i32.const 2)
            )
           )
          )
          (select
           (get_local $3)
           (get_local $7)
           (i32.lt_u
            (get_local $22)
            (i32.const 2)
           )
          )
         )
        )
        (i32.const 255)
       )
      )
      (tee_local $8
       (i32.and
        (get_local $16)
        (i32.const 255)
       )
      )
     )
    )
    (set_local $11
     (i32.sub
      (i32.const 1)
      (get_local $8)
     )
    )
    (set_local $13
     (get_local $8)
    )
    (loop $label$2
     (block $label$3
      (block $label$4
       (block $label$5
        (br_if $label$5
         (i32.ge_u
          (tee_local $23
           (i32.and
            (get_local $15)
            (i32.const 255)
           )
          )
          (i32.const 3)
         )
        )
        (set_local $19
         (i32.const 14)
        )
        (set_local $22
         (i32.const 14)
        )
        (set_local $20
         (get_local $5)
        )
        (br_if $label$4
         (i32.eq
          (get_local $23)
          (i32.const 2)
         )
        )
        (br $label$3)
       )
       (set_local $22
        (i32.const 14)
       )
       (block $label$6
        (br_if $label$6
         (i32.lt_u
          (tee_local $23
           (i32.and
            (get_local $16)
            (i32.const 255)
           )
          )
          (get_local $3)
         )
        )
        (set_local $22
         (i32.sub
          (select
           (i32.add
            (get_local $13)
            (i32.const 15)
           )
           (i32.const 29)
           (i32.lt_u
            (get_local $23)
            (i32.const 15)
           )
          )
          (get_local $3)
         )
        )
       )
       (set_local $19
        (i32.and
         (get_local $22)
         (i32.const 255)
        )
       )
      )
      (block $label$7
       (block $label$8
        (br_if $label$8
         (i32.ge_s
          (tee_local $23
           (i32.sub
            (get_local $13)
            (get_local $8)
           )
          )
          (get_local $3)
         )
        )
        (set_local $20
         (i32.add
          (i32.add
           (get_local $11)
           (get_local $13)
          )
          (get_local $19)
         )
        )
        (br $label$7)
       )
       (set_local $20
        (i32.add
         (i32.add
          (get_local $19)
          (i32.xor
           (get_local $23)
           (i32.const -1)
          )
         )
         (get_local $6)
        )
       )
      )
      (set_local $19
       (get_local $22)
      )
     )
     (block $label$9
      (br_if $label$9
       (i32.le_u
        (tee_local $12
         (i32.and
          (get_local $20)
          (i32.const 255)
         )
        )
        (tee_local $13
         (i32.and
          (get_local $19)
          (i32.const 255)
         )
        )
       )
      )
      (set_local $21
       (i32.const 0)
      )
      (set_local $25
       (i32.const 0)
      )
      (set_local $24
       (i32.const 0)
      )
      (set_local $23
       (i32.const 0)
      )
      (loop $label$10
       (block $label$11
        (block $label$12
         (br_if $label$12
          (i32.eqz
           (tee_local $22
            (i32.load8_u
             (i32.add
              (get_local $0)
              (tee_local $18
               (i32.load8_u
                (i32.add
                 (tee_local $17
                  (i32.add
                   (i32.mul
                    (i32.add
                     (i32.mul
                      (i32.and
                       (get_local $15)
                       (i32.const 255)
                      )
                      (i32.const 29)
                     )
                     (i32.and
                      (get_local $16)
                      (i32.const 255)
                     )
                    )
                    (i32.const 43)
                   )
                   (get_local $13)
                  )
                 )
                 (i32.const 48)
                )
               )
              )
             )
            )
           )
          )
         )
         (set_local $24
          (select
           (i32.add
            (get_local $24)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $22
            (i32.eq
             (get_local $22)
             (i32.and
              (get_local $1)
              (i32.const 255)
             )
            )
           )
          )
         )
         (set_local $25
          (select
           (get_local $25)
           (get_local $21)
           (get_local $22)
          )
         )
         (set_local $23
          (select
           (get_local $23)
           (i32.const 0)
           (get_local $22)
          )
         )
         (br $label$11)
        )
        (i32.store8
         (i32.add
          (tee_local $22
           (i32.and
            (get_local $21)
            (i32.const 255)
           )
          )
          (i32.const 85728)
         )
         (get_local $18)
        )
        (i32.store8
         (i32.add
          (get_local $22)
          (i32.const 85744)
         )
         (get_local $19)
        )
        (set_local $21
         (i32.add
          (get_local $21)
          (i32.const 1)
         )
        )
        (set_local $23
         (i32.add
          (get_local $23)
          (i32.const 1)
         )
        )
       )
       (block $label$13
        (br_if $label$13
         (i32.ne
          (i32.add
           (tee_local $22
            (i32.and
             (get_local $24)
             (i32.const 255)
            )
           )
           (i32.and
            (get_local $23)
            (i32.const 255)
           )
          )
          (i32.const 5)
         )
        )
        (block $label$14
         (block $label$15
          (br_if $label$15
           (i32.eq
            (get_local $22)
            (i32.const 4)
           )
          )
          (br_if $label$14
           (i32.ne
            (get_local $22)
            (i32.const 5)
           )
          )
          (block $label$16
           (br_if $label$16
            (i32.ne
             (get_local $1)
             (i32.const 1)
            )
           )
           (br_if $label$16
            (i32.ne
             (i32.and
              (i32.load8_u offset=32
               (i32.const 0)
              )
              (i32.const 255)
             )
             (i32.const 2)
            )
           )
           (br_if $label$14
            (i32.eq
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $17)
                 (i32.const 43)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
           (br_if $label$14
            (i32.eq
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $17)
                 (i32.const 49)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
          )
          (set_local $14
           (i32.const 1)
          )
          (set_local $15
           (i32.const 4)
          )
          (set_local $16
           (get_local $9)
          )
          (set_local $19
           (get_local $20)
          )
          (br $label$14)
         )
         (block $label$17
          (block $label$18
           (br_if $label$18
            (i32.ne
             (get_local $1)
             (i32.const 1)
            )
           )
           (br_if $label$18
            (i32.ne
             (i32.and
              (i32.load8_u offset=32
               (i32.const 0)
              )
              (i32.const 255)
             )
             (i32.const 2)
            )
           )
           (br_if $label$14
            (i32.eq
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $17)
                 (i32.const 43)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
           (br_if $label$14
            (i32.eq
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.load8_u
                (i32.add
                 (get_local $17)
                 (i32.const 49)
                )
               )
              )
             )
             (i32.const 1)
            )
           )
           (br_if $label$17
            (i32.lt_u
             (i32.and
              (get_local $25)
              (i32.const 255)
             )
             (i32.and
              (get_local $21)
              (i32.const 255)
             )
            )
           )
           (br $label$14)
          )
          (br_if $label$14
           (i32.ge_u
            (i32.and
             (get_local $25)
             (i32.const 255)
            )
            (i32.and
             (get_local $21)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $18
          (i32.and
           (get_local $21)
           (i32.const 255)
          )
         )
         (set_local $22
          (i32.and
           (get_local $25)
           (i32.const 255)
          )
         )
         (loop $label$19
          (i32.store16
           (i32.add
            (i32.shl
             (i32.load8_u
              (i32.add
               (get_local $22)
               (i32.const 85728)
              )
             )
             (i32.const 1)
            )
            (get_local $2)
           )
           (i32.or
            (i32.shl
             (i32.sub
              (get_local $13)
              (i32.load8_u
               (i32.add
                (get_local $22)
                (i32.const 85744)
               )
              )
             )
             (i32.const 5)
            )
            (i32.const 10)
           )
          )
          (br_if $label$19
           (i32.ne
            (get_local $18)
            (tee_local $22
             (i32.add
              (get_local $22)
              (i32.const 1)
             )
            )
           )
          )
         )
        )
        (block $label$20
         (br_if $label$20
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.load8_u
              (i32.add
               (get_local $17)
               (i32.const 44)
              )
             )
            )
           )
          )
         )
         (set_local $24
          (i32.add
           (get_local $24)
           (i32.const -1)
          )
         )
         (br $label$13)
        )
        (set_local $25
         (i32.add
          (get_local $25)
          (i32.const 1)
         )
        )
        (set_local $23
         (i32.add
          (get_local $23)
          (i32.const -1)
         )
        )
       )
       (br_if $label$10
        (i32.gt_u
         (get_local $12)
         (tee_local $13
          (i32.and
           (tee_local $19
            (i32.add
             (get_local $19)
             (i32.const 1)
            )
           )
           (i32.const 255)
          )
         )
        )
       )
      )
     )
     (br_if $label$2
      (i32.gt_u
       (get_local $10)
       (tee_local $13
        (i32.and
         (tee_local $16
          (i32.add
           (get_local $16)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
    )
   )
   (set_local $23
    (i32.shl
     (i32.and
      (get_local $15)
      (i32.const 255)
     )
     (i32.const 12)
    )
   )
   (set_local $22
    (i32.const -450)
   )
   (loop $label$21
    (block $label$22
     (br_if $label$22
      (i32.ne
       (i32.and
        (tee_local $13
         (i32.load16_u
          (i32.add
           (get_local $22)
           (i32.const 86210)
          )
         )
        )
        (i32.const 14)
       )
       (i32.const 10)
      )
     )
     (i32.store16
      (i32.add
       (get_local $22)
       (i32.const 86674)
      )
      (i32.or
       (i32.and
        (get_local $13)
        (i32.const 36863)
       )
       (get_local $23)
      )
     )
    )
    (br_if $label$21
     (tee_local $22
      (i32.add
       (get_local $22)
       (i32.const 2)
      )
     )
    )
   )
   (br_if $label$0
    (i32.lt_u
     (i32.and
      (tee_local $15
       (i32.add
        (get_local $15)
        (i32.const 1)
       )
      )
      (i32.const 255)
     )
     (i32.const 4)
    )
   )
  )
  (set_local $22
   (i32.const 10)
  )
  (block $label$23
   (br_if $label$23
    (i32.and
     (get_local $14)
     (i32.const 1)
    )
   )
   (set_local $13
    (i32.const 0)
   )
   (set_local $22
    (i32.const 86224)
   )
   (set_local $23
    (i32.const 65535)
   )
   (block $label$24
    (loop $label$25
     (block $label$26
      (br_if $label$26
       (i32.ne
        (i32.and
         (i32.load16_u
          (get_local $22)
         )
         (i32.const 14)
        )
        (i32.const 10)
       )
      )
      (block $label$27
       (br_if $label$27
        (i32.eq
         (i32.and
          (get_local $23)
          (i32.const 65535)
         )
         (i32.const 65535)
        )
       )
       (br_if $label$26
        (i32.eq
         (get_local $13)
         (tee_local $24
          (i32.shr_s
           (i32.shl
            (get_local $23)
            (i32.const 16)
           )
           (i32.const 16)
          )
         )
        )
       )
       (br $label$24)
      )
      (set_local $23
       (get_local $13)
      )
     )
     (set_local $22
      (i32.add
       (get_local $22)
       (i32.const 2)
      )
     )
     (br_if $label$25
      (i32.lt_u
       (tee_local $13
        (i32.add
         (get_local $13)
         (i32.const 1)
        )
       )
       (i32.const 225)
      )
     )
    )
    (block $label$28
     (br_if $label$28
      (i32.eq
       (i32.and
        (get_local $23)
        (i32.const 65535)
       )
       (i32.const 65535)
      )
     )
     (set_local $22
      (i32.shr_s
       (i32.shl
        (get_local $23)
        (i32.const 16)
       )
       (i32.const 16)
      )
     )
     (block $label$29
      (br_if $label$29
       (i32.ne
        (get_local $1)
        (i32.const 2)
       )
      )
      (br_if $label$29
       (i32.ne
        (i32.and
         (i32.load8_u offset=32
          (i32.const 0)
         )
         (i32.const 255)
        )
        (i32.const 2)
       )
      )
      (br_if $label$29
       (i32.eqz
        (call $_Z6isFoulhPc
         (i32.and
          (get_local $23)
          (i32.const 255)
         )
         (get_local $0)
        )
       )
      )
      (set_local $22
       (i32.or
        (i32.shl
         (get_local $22)
         (i32.const 8)
        )
        (i32.const 9)
       )
      )
      (br $label$23)
     )
     (set_local $22
      (i32.or
       (i32.shl
        (get_local $22)
        (i32.const 8)
       )
       (i32.const 8)
      )
     )
     (br $label$23)
    )
    (set_local $22
     (i32.const 0)
    )
    (br $label$23)
   )
   (set_local $22
    (i32.or
     (i32.shl
      (get_local $24)
      (i32.const 8)
     )
     (i32.const 9)
    )
   )
  )
  (i32.and
   (get_local $22)
   (i32.const 65535)
  )
 )
)
