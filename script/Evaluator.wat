(module
 (type $FUNCSIG$vd (func (param f64)))
 (type $FUNCSIG$vii (func (param i32 i32)))
 (type $FUNCSIG$iiii (func (param i32 i32 i32) (result i32)))
 (import "env" "_Z3logPhj" (func $_Z3logPhj (param i32 i32)))
 (import "env" "_Z3logd" (func $_Z3logd (param f64)))
 (import "env" "memcpy" (func $memcpy (param i32 i32 i32) (result i32)))
 (import "env" "memset" (func $memset (param i32 i32 i32) (result i32)))
 (table 0 anyfunc)
 (memory $0 1963)
 (data (i32.const 131088) "\0f")
 (data (i32.const 131104) "\02")
 (data (i32.const 128632372) "\00\00\00\00")
 (data (i32.const 128632384) "I")
 (data (i32.const 128632400) "\00\02\01")
 (export "memory" (memory $0))
 (export "_Z11getInBufferv" (func $_Z11getInBufferv))
 (export "_Z12getOutBufferv" (func $_Z12getOutBufferv))
 (export "_Z14getVcfWinMovesv" (func $_Z14getVcfWinMovesv))
 (export "_Z11getVcfMovesv" (func $_Z11getVcfMovesv))
 (export "_Z10copyBufferPhS_l" (func $_Z10copyBufferPhS_l))
 (export "_Z10copyBufferPtS_l" (func $_Z10copyBufferPtS_l))
 (export "_Z10copyBufferPjS_l" (func $_Z10copyBufferPjS_l))
 (export "_Z9setBufferPhlh" (func $_Z9setBufferPhlh))
 (export "_Z9setBufferPtlt" (func $_Z9setBufferPtlt))
 (export "_Z9setBufferPjlj" (func $_Z9setBufferPjlj))
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
 (export "_Z13testLinePointhhcPcPt" (func $_Z13testLinePointhhcPcPt))
 (export "_Z17testLinePointFourhhcPcPt" (func $_Z17testLinePointFourhhcPcPt))
 (export "_Z18testLinePointThreehhcPcPt" (func $_Z18testLinePointThreehhcPcPt))
 (export "_Z17getBlockFourPointhPct" (func $_Z17getBlockFourPointhPct))
 (export "_Z19getBlockThreePointshPct" (func $_Z19getBlockThreePointshPct))
 (export "_Z16getFreeFourPointhPct" (func $_Z16getFreeFourPointhPct))
 (export "_Z6isFoulhPc" (func $_Z6isFoulhPc))
 (export "_Z13testPointFourhcPc" (func $_Z13testPointFourhcPc))
 (export "_Z8testFivePccPt" (func $_Z8testFivePccPt))
 (export "_Z8testFourPccPt" (func $_Z8testFourPccPt))
 (export "_Z9testThreePccPt" (func $_Z9testThreePccPt))
 (export "_Z8getLevelPcc" (func $_Z8getLevelPcc))
 (export "_Z11isChildMovePhhS_h" (func $_Z11isChildMovePhhS_h))
 (export "_Z12isRepeatMovePhS_h" (func $_Z12isRepeatMovePhS_h))
 (export "_Z21setVCFHashMaxMovesLenh" (func $_Z21setVCFHashMaxMovesLenh))
 (export "_Z8resetVCFv" (func $_Z8resetVCFv))
 (export "_Z15vcfPositionPushhjPc" (func $_Z15vcfPositionPushhjPc))
 (export "_Z14vcfPositionHashjPc" (func $_Z14vcfPositionHashjPc))
 (export "_Z12vcfMovesPushhjPh" (func $_Z12vcfMovesPushhjPh))
 (export "_Z11vcfMovesHashjPh" (func $_Z11vcfMovesHashjPh))
 (export "_Z17vcfTransTablePushhjPhPc" (func $_Z17vcfTransTablePushhjPhPc))
 (export "_Z16vcfTransTableHashjPhPc" (func $_Z16vcfTransTableHashjPhPc))
 (export "_Z5isVCFcPcPhh" (func $_Z5isVCFcPcPhh))
 (export "_Z9simpleVCFcPcPhRh" (func $_Z9simpleVCFcPcPhRh))
 (export "_Z7findVCFPcchhj" (func $_Z7findVCFPcchhj))
 (func $_Z11getInBufferv (; 4 ;) (result i32)
  (i32.const 65552)
 )
 (func $_Z12getOutBufferv (; 5 ;) (result i32)
  (i32.const 16)
 )
 (func $_Z14getVcfWinMovesv (; 6 ;) (result i32)
  (i32.const 285440)
 )
 (func $_Z11getVcfMovesv (; 7 ;) (result i32)
  (i32.const 218464)
 )
 (func $_Z10copyBufferPhS_l (; 8 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $2)
     (i32.const 1)
    )
   )
   (loop $label$1
    (i32.store8
     (get_local $0)
     (i32.load8_u
      (get_local $1)
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 1)
     )
    )
    (set_local $1
     (i32.add
      (get_local $1)
      (i32.const 1)
     )
    )
    (br_if $label$1
     (tee_local $2
      (i32.add
       (get_local $2)
       (i32.const -1)
      )
     )
    )
   )
  )
 )
 (func $_Z10copyBufferPtS_l (; 9 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $2)
     (i32.const 1)
    )
   )
   (loop $label$1
    (i32.store16
     (get_local $0)
     (i32.load16_u
      (get_local $1)
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 2)
     )
    )
    (set_local $1
     (i32.add
      (get_local $1)
      (i32.const 2)
     )
    )
    (br_if $label$1
     (tee_local $2
      (i32.add
       (get_local $2)
       (i32.const -1)
      )
     )
    )
   )
  )
 )
 (func $_Z10copyBufferPjS_l (; 10 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $2)
     (i32.const 1)
    )
   )
   (loop $label$1
    (i32.store
     (get_local $0)
     (i32.load
      (get_local $1)
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 4)
     )
    )
    (set_local $1
     (i32.add
      (get_local $1)
      (i32.const 4)
     )
    )
    (br_if $label$1
     (tee_local $2
      (i32.add
       (get_local $2)
       (i32.const -1)
      )
     )
    )
   )
  )
 )
 (func $_Z9setBufferPhlh (; 11 ;) (param $0 i32) (param $1 i32) (param $2 i32)
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
 (func $_Z9setBufferPtlt (; 12 ;) (param $0 i32) (param $1 i32) (param $2 i32)
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
 (func $_Z9setBufferPjlj (; 13 ;) (param $0 i32) (param $1 i32) (param $2 i32)
  (block $label$0
   (br_if $label$0
    (i32.lt_s
     (get_local $1)
     (i32.const 1)
    )
   )
   (loop $label$1
    (i32.store
     (get_local $0)
     (get_local $2)
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 4)
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
 (func $_Z16createEmptyListsv (; 14 ;)
  (drop
   (call $memset
    (i32.const 131120)
    (i32.const 225)
    (i32.const 4988)
   )
  )
 )
 (func $_Z14createIdxListsv (; 15 ;)
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
   (i32.const 131148)
  )
  (set_local $14
   (i32.lt_u
    (tee_local $0
     (i32.load8_u offset=131088
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
   (i32.const 132395)
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
   (i32.const 133628)
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
   (i32.const 134832)
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
   (i32.const 134875)
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
   (i32.const 136079)
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
 (func $_Z14createIdxTablev (; 16 ;)
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
  (set_local $2
   (i32.const 0)
  )
  (set_local $0
   (i32.load8_u offset=131088
    (i32.const 0)
   )
  )
  (set_local $1
   (i32.const 136113)
  )
  (set_local $3
   (i32.const 0)
  )
  (loop $label$0
   (set_local $4
    (i32.div_u
     (tee_local $11
      (i32.and
       (get_local $3)
       (i32.const 255)
      )
     )
     (i32.const 15)
    )
   )
   (set_local $12
    (i32.div_u
     (i32.and
      (get_local $2)
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
       (tee_local $9
        (i32.and
         (get_local $0)
         (i32.const 255)
        )
       )
      )
     )
     (set_local $5
      (i32.add
       (i32.add
        (tee_local $7
         (i32.mul
          (get_local $12)
          (i32.const 43)
         )
        )
        (get_local $11)
       )
       (i32.const 131120)
      )
     )
     (set_local $6
      (i32.add
       (i32.add
        (tee_local $10
         (i32.mul
          (get_local $11)
          (i32.const 43)
         )
        )
        (get_local $12)
       )
       (i32.const 132367)
      )
     )
     (set_local $8
      (i32.add
       (i32.add
        (i32.add
         (select
          (tee_local $12
           (i32.add
            (get_local $4)
            (i32.const 14)
           )
          )
          (i32.sub
           (i32.const 28)
           (get_local $11)
          )
          (i32.lt_u
           (i32.add
            (get_local $4)
            (get_local $11)
           )
           (i32.const 15)
          )
         )
         (get_local $10)
        )
        (get_local $7)
       )
       (i32.const 134847)
      )
     )
     (set_local $7
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
            (get_local $4)
           )
           (i32.const 15)
          )
         )
         (get_local $10)
        )
        (get_local $7)
       )
       (i32.const 134202)
      )
     )
     (set_local $12
      (i32.const 0)
     )
     (set_local $11
      (get_local $1)
     )
     (loop $label$3
      (block $label$4
       (block $label$5
        (br_if $label$5
         (i32.ge_u
          (i32.and
           (get_local $4)
           (i32.const 255)
          )
          (get_local $9)
         )
        )
        (i32.store8
         (i32.add
          (get_local $11)
          (i32.const -1)
         )
         (i32.load8_u
          (i32.add
           (get_local $5)
           (get_local $12)
          )
         )
        )
        (i32.store8
         (get_local $11)
         (i32.load8_u
          (i32.add
           (get_local $6)
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
           (get_local $7)
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
           (get_local $8)
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
        (get_local $3)
        (i32.const 116)
       )
       (i32.const 136112)
      )
      (i32.const 225)
      (i32.const 116)
     )
    )
   )
   (set_local $1
    (i32.add
     (get_local $1)
     (i32.const 116)
    )
   )
   (set_local $2
    (i32.add
     (get_local $2)
     (i32.const 1)
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
     (i32.const 225)
    )
   )
  )
  (drop
   (call $memset
    (i32.const 162212)
    (i32.const 225)
    (i32.const 116)
   )
  )
 )
 (func $_Z7moveIdxhch (; 17 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
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
    (i32.const 136168)
   )
  )
 )
 (func $_Z11getArrValuehchPc (; 18 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
      (i32.const 136168)
     )
    )
   )
  )
 )
 (func $_Z20createAroundIdxTablev (; 19 ;)
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
   (i32.load8_u offset=131088
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
     (i32.const 162350)
    )
    (i32.const 0)
   )
   (i32.store16
    (i32.add
     (get_local $1)
     (i32.const 162348)
    )
    (i32.const 0)
   )
   (i32.store
    (i32.add
     (get_local $1)
     (i32.const 162344)
    )
    (i32.const 0)
   )
   (i64.store
    (tee_local $4
     (i32.add
      (get_local $1)
      (i32.const 162336)
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
      (i32.const 162336)
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
        (i32.const 136169)
       )
      )
     )
     (set_local $5
      (i32.load8_u
       (i32.add
        (get_local $4)
        (i32.const 136168)
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
        (i32.const 136168)
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
           (i32.const 136169)
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
             (i32.const 136168)
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
          (i32.const 162336)
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
             (i32.const 136169)
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
          (i32.const 162336)
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
             (i32.const 136168)
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
          (i32.const 162336)
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
             (i32.const 136169)
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
          (i32.const 162336)
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
       (i32.const 162336)
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
 (func $_Z9aroundIdxhh (; 20 ;) (param $0 i32) (param $1 i32) (result i32)
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
    (i32.const 162336)
   )
  )
 )
 (func $_Z17getAroundIdxCounthh (; 21 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.load8_u
   (i32.add
    (i32.add
     (i32.mul
      (get_local $0)
      (i32.const 240)
     )
     (get_local $1)
    )
    (i32.const 162336)
   )
  )
 )
 (func $_Z4inithh (; 22 ;) (param $0 i32) (param $1 i32) (result i32)
  (i32.store8 offset=131088
   (i32.const 0)
   (get_local $0)
  )
  (i32.store8 offset=131104
   (i32.const 0)
   (get_local $1)
  )
  (drop
   (call $memset
    (i32.const 131120)
    (i32.const 225)
    (i32.const 4988)
   )
  )
  (call $_Z14createIdxListsv)
  (call $_Z14createIdxTablev)
  (call $_Z20createAroundIdxTablev)
  (i32.const 1)
 )
 (func $_Z8testLinehhcPc (; 23 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
  (i32.store8 offset=216336
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
       (i32.const 136148)
      )
     )
    )
   )
  )
  (i32.store8 offset=216337
   (i32.const 0)
   (tee_local $9
    (i32.load8_u
     (i32.add
      (get_local $3)
      (i32.load8_u
       (i32.add
        (get_local $0)
        (i32.const 136152)
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
    (set_local $8
     (i32.add
      (get_local $0)
      (i32.const 136156)
     )
    )
    (set_local $0
     (i32.const -9)
    )
    (set_local $13
     (i32.const 255)
    )
    (set_local $16
     (i32.const 0)
    )
    (set_local $17
     (i32.const 0)
    )
    (set_local $12
     (i32.const 0)
    )
    (set_local $11
     (i32.const 0)
    )
    (set_local $10
     (i32.const 0)
    )
    (set_local $6
     (i32.const 0)
    )
    (set_local $14
     (i32.const 0)
    )
    (loop $label$2
     (i32.store8
      (i32.add
       (get_local $0)
       (i32.const 216347)
      )
      (tee_local $7
       (i32.load8_u
        (i32.add
         (get_local $3)
         (i32.load8_u
          (get_local $8)
         )
        )
       )
      )
     )
     (block $label$3
      (block $label$4
       (br_if $label$4
        (i32.eqz
         (tee_local $9
          (i32.and
           (get_local $9)
           (i32.const 255)
          )
         )
        )
       )
       (set_local $16
        (select
         (i32.add
          (get_local $16)
          (i32.const 1)
         )
         (i32.const 0)
         (tee_local $9
          (i32.eq
           (get_local $9)
           (i32.const 1)
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
       (br $label$3)
      )
      (set_local $17
       (i32.add
        (get_local $17)
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
              (tee_local $5
               (i32.and
                (get_local $16)
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
           (set_local $15
            (i32.add
             (get_local $0)
             (i32.const 5)
            )
           )
           (br_if $label$7
            (i32.ne
             (i32.load8_u offset=131104
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
               (i32.const 216341)
              )
             )
             (i32.const 1)
            )
           )
           (set_local $9
            (get_local $7)
           )
           (br $label$8)
          )
          (set_local $9
           (get_local $7)
          )
          (br $label$5)
         )
         (set_local $9
          (i32.const 1)
         )
         (br_if $label$7
          (i32.ne
           (i32.and
            (get_local $7)
            (i32.const 255)
           )
           (i32.const 1)
          )
         )
        )
        (set_local $13
         (select
          (i32.const 28)
          (get_local $13)
          (tee_local $7
           (i32.and
            (i32.eq
             (get_local $5)
             (i32.const 5)
            )
            (i32.gt_s
             (get_local $5)
             (i32.shr_s
              (i32.shl
               (get_local $13)
               (i32.const 24)
              )
              (i32.const 24)
             )
            )
           )
          )
         )
        )
        (set_local $12
         (select
          (get_local $15)
          (get_local $12)
          (get_local $7)
         )
        )
        (set_local $11
         (select
          (i32.const 0)
          (get_local $11)
          (get_local $7)
         )
        )
        (set_local $10
         (select
          (i32.const 0)
          (get_local $10)
          (get_local $7)
         )
        )
        (br $label$6)
       )
       (set_local $12
        (select
         (get_local $15)
         (get_local $12)
         (tee_local $9
          (i32.gt_s
           (get_local $5)
           (i32.shr_s
            (i32.shl
             (get_local $13)
             (i32.const 24)
            )
            (i32.const 24)
           )
          )
         )
        )
       )
       (set_local $11
        (select
         (i32.const 0)
         (get_local $11)
         (get_local $9)
        )
       )
       (set_local $10
        (select
         (i32.const 0)
         (get_local $10)
         (get_local $9)
        )
       )
       (set_local $4
        (select
         (i32.const 1)
         (get_local $6)
         (get_local $9)
        )
       )
       (set_local $14
        (select
         (i32.const 0)
         (get_local $14)
         (get_local $9)
        )
       )
       (block $label$11
        (br_if $label$11
         (i32.ne
          (get_local $5)
          (i32.shr_s
           (i32.shl
            (tee_local $13
             (select
              (get_local $16)
              (get_local $13)
              (get_local $9)
             )
            )
            (i32.const 24)
           )
           (i32.const 24)
          )
         )
        )
        (set_local $12
         (select
          (get_local $15)
          (get_local $12)
          (tee_local $9
           (i32.and
            (get_local $14)
            (i32.const 255)
           )
          )
         )
        )
        (set_local $6
         (i32.const 0)
        )
        (set_local $10
         (i32.add
          (get_local $10)
          (i32.ne
           (get_local $9)
           (i32.const 0)
          )
         )
        )
        (set_local $11
         (i32.add
          (get_local $11)
          (i32.ne
           (i32.and
            (get_local $4)
            (i32.const 255)
           )
           (i32.const 0)
          )
         )
        )
        (set_local $14
         (i32.const 1)
        )
        (set_local $9
         (get_local $7)
        )
        (br $label$6)
       )
       (set_local $9
        (get_local $7)
       )
       (set_local $6
        (get_local $4)
       )
      )
      (block $label$12
       (br_if $label$12
        (i32.eqz
         (i32.load8_u
          (i32.add
           (get_local $0)
           (i32.const 216342)
          )
         )
        )
       )
       (set_local $16
        (i32.add
         (get_local $16)
         (i32.const -1)
        )
       )
       (set_local $14
        (i32.const 0)
       )
       (br $label$5)
      )
      (set_local $17
       (i32.add
        (get_local $17)
        (i32.const -1)
       )
      )
      (set_local $6
       (i32.const 1)
      )
     )
     (set_local $8
      (i32.add
       (get_local $8)
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
   (set_local $8
    (i32.add
     (get_local $0)
     (i32.const 136156)
    )
   )
   (set_local $0
    (i32.const -9)
   )
   (set_local $13
    (i32.const 255)
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
   (set_local $11
    (i32.const 0)
   )
   (set_local $10
    (i32.const 0)
   )
   (set_local $15
    (i32.const 0)
   )
   (set_local $14
    (i32.const 0)
   )
   (loop $label$13
    (set_local $7
     (get_local $9)
    )
    (i32.store8
     (i32.add
      (get_local $0)
      (i32.const 216347)
     )
     (tee_local $9
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.load8_u
         (get_local $8)
        )
       )
      )
     )
    )
    (block $label$14
     (block $label$15
      (br_if $label$15
       (i32.eqz
        (tee_local $7
         (i32.and
          (get_local $7)
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
        (tee_local $7
         (i32.eq
          (get_local $7)
          (i32.and
           (get_local $2)
           (i32.const 255)
          )
         )
        )
       )
      )
      (set_local $16
       (select
        (get_local $16)
        (i32.const 0)
        (get_local $7)
       )
      )
      (br $label$14)
     )
     (set_local $16
      (i32.add
       (get_local $16)
       (i32.const 1)
      )
     )
    )
    (block $label$16
     (br_if $label$16
      (i32.ne
       (i32.add
        (tee_local $5
         (i32.and
          (get_local $17)
          (i32.const 255)
         )
        )
        (i32.and
         (get_local $16)
         (i32.const 255)
        )
       )
       (i32.const 5)
      )
     )
     (set_local $12
      (select
       (tee_local $4
        (i32.add
         (get_local $0)
         (i32.const 5)
        )
       )
       (get_local $12)
       (tee_local $7
        (i32.gt_s
         (get_local $5)
         (i32.shr_s
          (i32.shl
           (get_local $13)
           (i32.const 24)
          )
          (i32.const 24)
         )
        )
       )
      )
     )
     (set_local $11
      (select
       (i32.const 0)
       (get_local $11)
       (get_local $7)
      )
     )
     (set_local $10
      (select
       (i32.const 0)
       (get_local $10)
       (get_local $7)
      )
     )
     (set_local $6
      (select
       (i32.const 1)
       (get_local $15)
       (get_local $7)
      )
     )
     (set_local $14
      (select
       (i32.const 0)
       (get_local $14)
       (get_local $7)
      )
     )
     (block $label$17
      (block $label$18
       (br_if $label$18
        (i32.ne
         (get_local $5)
         (i32.shr_s
          (i32.shl
           (tee_local $13
            (select
             (get_local $17)
             (get_local $13)
             (get_local $7)
            )
           )
           (i32.const 24)
          )
          (i32.const 24)
         )
        )
       )
       (set_local $12
        (select
         (get_local $4)
         (get_local $12)
         (tee_local $7
          (i32.and
           (get_local $14)
           (i32.const 255)
          )
         )
        )
       )
       (set_local $15
        (i32.const 0)
       )
       (set_local $10
        (i32.add
         (get_local $10)
         (i32.ne
          (get_local $7)
          (i32.const 0)
         )
        )
       )
       (set_local $11
        (i32.add
         (get_local $11)
         (i32.ne
          (i32.and
           (get_local $6)
           (i32.const 255)
          )
          (i32.const 0)
         )
        )
       )
       (set_local $14
        (i32.const 1)
       )
       (br $label$17)
      )
      (set_local $15
       (get_local $6)
      )
     )
     (block $label$19
      (br_if $label$19
       (i32.eqz
        (i32.load8_u
         (i32.add
          (get_local $0)
          (i32.const 216342)
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
      (set_local $14
       (i32.const 0)
      )
      (br $label$16)
     )
     (set_local $16
      (i32.add
       (get_local $16)
       (i32.const -1)
      )
     )
     (set_local $15
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.add
      (get_local $8)
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
  (block $label$20
   (block $label$21
    (br_if $label$21
     (i32.eq
      (tee_local $9
       (i32.and
        (get_local $13)
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
      (get_local $9)
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
      (get_local $11)
      (i32.const 255)
     )
     (i32.const 2)
    )
   )
   (set_local $0
    (i32.shl
     (i32.eqz
      (i32.and
       (get_local $10)
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
         (tee_local $9
          (i32.and
           (get_local $10)
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
        (get_local $9)
        (i32.const 0)
       )
      )
      (i32.shl
       (i32.and
        (get_local $12)
        (i32.const 255)
       )
       (i32.const 5)
      )
     )
     (i32.and
      (i32.shl
       (get_local $13)
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
 (func $_Z12testLineFoulhhcPc (; 24 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
  (set_local $17
   (i32.const 0)
  )
  (i32.store8 offset=216336
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
       (i32.const 136148)
      )
     )
    )
   )
  )
  (i32.store8 offset=216337
   (i32.const 0)
   (tee_local $14
    (i32.load8_u
     (i32.add
      (get_local $3)
      (i32.load8_u
       (i32.add
        (get_local $0)
        (i32.const 136152)
       )
      )
     )
    )
   )
  )
  (set_local $12
   (i32.add
    (get_local $0)
    (i32.const 136156)
   )
  )
  (set_local $13
   (i32.const -5)
  )
  (set_local $16
   (i32.const 0)
  )
  (set_local $5
   (i32.const 0)
  )
  (set_local $6
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
  (set_local $15
   (i32.const 0)
  )
  (block $label$0
   (loop $label$1
    (i32.store8
     (i32.add
      (tee_local $4
       (get_local $13)
      )
      (i32.const 216343)
     )
     (tee_local $10
      (i32.load8_u
       (i32.add
        (get_local $3)
        (i32.load8_u
         (get_local $12)
        )
       )
      )
     )
    )
    (block $label$2
     (block $label$3
      (br_if $label$3
       (i32.eq
        (tee_local $13
         (i32.and
          (get_local $14)
          (i32.const 255)
         )
        )
        (i32.const 1)
       )
      )
      (set_local $0
       (i32.const 0)
      )
      (set_local $11
       (i32.const 0)
      )
      (br_if $label$2
       (get_local $13)
      )
      (set_local $0
       (i32.add
        (get_local $16)
        (i32.const 1)
       )
      )
      (set_local $11
       (get_local $17)
      )
      (br $label$2)
     )
     (set_local $11
      (i32.add
       (get_local $17)
       (i32.const 1)
      )
     )
     (set_local $0
      (get_local $16)
     )
    )
    (block $label$4
     (set_local $13
      (i32.add
       (get_local $4)
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
                    (tee_local $14
                     (i32.and
                      (get_local $11)
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
                   (get_local $14)
                   (i32.const 3)
                  )
                 )
                 (br_if $label$14
                  (i32.eq
                   (get_local $14)
                   (i32.const 4)
                  )
                 )
                 (br_if $label$4
                  (i32.eq
                   (get_local $14)
                   (i32.const 5)
                  )
                 )
                 (set_local $16
                  (get_local $8)
                 )
                 (br $label$7)
                )
                (set_local $14
                 (get_local $10)
                )
                (set_local $16
                 (get_local $0)
                )
                (br $label$6)
               )
               (br_if $label$13
                (i32.gt_s
                 (tee_local $14
                  (i32.shr_s
                   (i32.shl
                    (get_local $15)
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
                   (get_local $4)
                   (i32.const 216337)
                  )
                 )
                 (i32.const 1)
                )
               )
               (set_local $16
                (get_local $8)
               )
               (br $label$7)
              )
              (br_if $label$12
               (i32.ne
                (i32.load8_u
                 (i32.add
                  (get_local $4)
                  (i32.const 216337)
                 )
                )
                (i32.const 1)
               )
              )
             )
             (set_local $16
              (get_local $8)
             )
             (br $label$7)
            )
            (br_if $label$10
             (i32.eq
              (i32.and
               (get_local $10)
               (i32.const 255)
              )
              (i32.const 1)
             )
            )
            (set_local $5
             (select
              (select
               (get_local $13)
               (get_local $5)
               (tee_local $14
                (i32.lt_s
                 (tee_local $17
                  (i32.shr_s
                   (i32.shl
                    (get_local $15)
                    (i32.const 24)
                   )
                   (i32.const 24)
                  )
                 )
                 (i32.const 4)
                )
               )
              )
              (get_local $13)
              (i32.or
               (get_local $14)
               (i32.eqz
                (tee_local $9
                 (i32.and
                  (get_local $9)
                  (i32.const 255)
                 )
                )
               )
              )
             )
            )
            (set_local $16
             (i32.const 0)
            )
            (set_local $7
             (i32.add
              (select
               (i32.const 0)
               (get_local $7)
               (get_local $14)
              )
              (i32.and
               (i32.gt_s
                (get_local $17)
                (i32.const 3)
               )
               (i32.ne
                (get_local $9)
                (i32.const 0)
               )
              )
             )
            )
            (set_local $6
             (i32.add
              (select
               (i32.const 0)
               (get_local $6)
               (get_local $14)
              )
              (i32.or
               (get_local $14)
               (i32.ne
                (i32.and
                 (get_local $8)
                 (i32.const 255)
                )
                (i32.const 0)
               )
              )
             )
            )
            (set_local $15
             (select
              (i32.const 4)
              (get_local $15)
              (get_local $14)
             )
            )
            (br $label$8)
           )
           (br_if $label$9
            (i32.ne
             (i32.and
              (get_local $10)
              (i32.const 255)
             )
             (i32.const 1)
            )
           )
          )
          (set_local $10
           (i32.const 1)
          )
          (set_local $16
           (get_local $8)
          )
          (br $label$7)
         )
         (set_local $15
          (i32.const 3)
         )
         (set_local $5
          (select
           (select
            (get_local $13)
            (get_local $5)
            (tee_local $17
             (i32.lt_s
              (get_local $14)
              (i32.const 3)
             )
            )
           )
           (get_local $13)
           (i32.or
            (get_local $17)
            (i32.eqz
             (tee_local $9
              (i32.and
               (get_local $9)
               (i32.const 255)
              )
             )
            )
           )
          )
         )
         (set_local $16
          (i32.const 0)
         )
         (set_local $7
          (i32.add
           (select
            (i32.const 0)
            (get_local $7)
            (get_local $17)
           )
           (i32.and
            (i32.gt_s
             (get_local $14)
             (i32.const 2)
            )
            (i32.ne
             (get_local $9)
             (i32.const 0)
            )
           )
          )
         )
         (set_local $6
          (i32.add
           (select
            (i32.const 0)
            (get_local $6)
            (get_local $17)
           )
           (i32.or
            (get_local $17)
            (i32.ne
             (i32.and
              (get_local $8)
              (i32.const 255)
             )
             (i32.const 0)
            )
           )
          )
         )
        )
        (set_local $9
         (i32.const 1)
        )
       )
       (block $label$17
        (br_if $label$17
         (i32.eqz
          (i32.load8_u
           (i32.add
            (get_local $4)
            (i32.const 216338)
           )
          )
         )
        )
        (set_local $17
         (i32.add
          (get_local $11)
          (i32.const -1)
         )
        )
        (set_local $9
         (i32.const 0)
        )
        (set_local $14
         (get_local $10)
        )
        (set_local $8
         (get_local $16)
        )
        (set_local $16
         (get_local $0)
        )
        (br $label$5)
       )
       (set_local $16
        (i32.add
         (get_local $0)
         (i32.const -1)
        )
       )
       (set_local $8
        (i32.const 1)
       )
       (set_local $14
        (get_local $10)
       )
      )
      (set_local $17
       (get_local $11)
      )
     )
     (set_local $12
      (i32.add
       (get_local $12)
       (i32.const 4)
      )
     )
     (br_if $label$1
      (i32.lt_s
       (get_local $13)
       (i32.const 4)
      )
     )
     (br $label$0)
    )
   )
   (set_local $5
    (i32.add
     (get_local $4)
     (i32.const 1)
    )
   )
   (set_local $7
    (i32.const 0)
   )
   (set_local $15
    (i32.const 28)
   )
   (block $label$18
    (br_if $label$18
     (i32.eq
      (i32.load8_u
       (i32.add
        (get_local $4)
        (i32.const 216337)
       )
      )
      (i32.const 1)
     )
    )
    (set_local $15
     (select
      (i32.const 28)
      (i32.const 5)
      (i32.eq
       (i32.and
        (get_local $10)
        (i32.const 255)
       )
       (i32.const 1)
      )
     )
    )
   )
   (set_local $6
    (i32.const 0)
   )
  )
  (set_local $11
   (i32.or
    (i32.or
     (i32.shl
      (tee_local $0
       (i32.and
        (get_local $7)
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
      (get_local $5)
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
        (get_local $15)
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
          (get_local $15)
          (i32.const 24)
         )
         (i32.const 24)
        )
        (i32.const 1)
       )
      )
      (i32.gt_u
       (i32.and
        (get_local $6)
        (i32.const 255)
       )
       (i32.const 1)
      )
     )
     (get_local $0)
     (i32.eq
      (i32.and
       (get_local $15)
       (i32.const 255)
      )
      (i32.const 4)
     )
    )
   )
  )
  (i32.and
   (i32.or
    (get_local $11)
    (get_local $0)
   )
   (i32.const 65535)
  )
 )
 (func $_Z12testLineFourhhcPc (; 25 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
   (i32.add
    (get_local $1)
    (i32.const 56)
   )
  )
  (set_local $4
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
           (tee_local $6
            (i32.and
             (i32.eq
              (get_local $2)
              (i32.const 1)
             )
             (i32.eq
              (i32.load8_u offset=131104
               (i32.const 0)
              )
              (i32.const 2)
             )
            )
           )
          )
         )
         (set_local $9
          (i32.add
           (i32.add
            (i32.mul
             (get_local $0)
             (i32.const 116)
            )
            (get_local $1)
           )
           (i32.const 136152)
          )
         )
         (set_local $11
          (i32.const -4)
         )
         (set_local $15
          (i32.const -5)
         )
         (set_local $10
          (i32.const -67108864)
         )
         (set_local $13
          (i32.const 0)
         )
         (set_local $0
          (i32.const 0)
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
         (set_local $12
          (i32.const 0)
         )
         (set_local $14
          (i32.const 0)
         )
         (set_local $16
          (i32.const 0)
         )
         (loop $label$7
          (set_local $7
           (get_local $15)
          )
          (block $label$8
           (block $label$9
            (br_if $label$9
             (i32.eqz
              (tee_local $15
               (i32.load8_u
                (i32.add
                 (get_local $3)
                 (i32.load8_u
                  (get_local $9)
                 )
                )
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
              (tee_local $15
               (i32.eq
                (get_local $15)
                (i32.const 1)
               )
              )
             )
            )
            (set_local $0
             (select
              (get_local $0)
              (i32.const 0)
              (get_local $15)
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
          (set_local $15
           (i32.add
            (get_local $7)
            (i32.const 1)
           )
          )
          (block $label$10
           (br_if $label$10
            (i32.ne
             (i32.add
              (tee_local $8
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
           (block $label$11
            (block $label$12
             (br_if $label$12
              (i32.eq
               (get_local $8)
               (i32.const 4)
              )
             )
             (set_local $2
              (get_local $10)
             )
             (br_if $label$11
              (i32.ne
               (get_local $8)
               (i32.const 5)
              )
             )
             (br $label$5)
            )
            (set_local $2
             (i32.shl
              (get_local $11)
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
                       (get_local $10)
                       (i32.const -83886080)
                      )
                      (i32.const 24)
                     )
                     (get_local $4)
                    )
                    (i32.const 2)
                   )
                   (get_local $5)
                  )
                  (i32.const 136112)
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
                       (get_local $10)
                       (i32.const 16777216)
                      )
                      (i32.const 24)
                     )
                     (get_local $4)
                    )
                    (i32.const 2)
                   )
                   (get_local $5)
                  )
                  (i32.const 136112)
                 )
                )
               )
              )
              (i32.const 1)
             )
            )
            (set_local $19
             (select
              (select
               (get_local $15)
               (get_local $19)
               (tee_local $7
                (i32.lt_s
                 (tee_local $8
                  (i32.shr_s
                   (i32.shl
                    (get_local $16)
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
               (get_local $7)
               (i32.eqz
                (tee_local $14
                 (i32.and
                  (get_local $14)
                  (i32.const 255)
                 )
                )
               )
              )
             )
            )
            (set_local $17
             (i32.add
              (select
               (i32.const 0)
               (get_local $17)
               (get_local $7)
              )
              (i32.and
               (i32.gt_s
                (get_local $8)
                (i32.const 3)
               )
               (i32.ne
                (get_local $14)
                (i32.const 0)
               )
              )
             )
            )
            (set_local $18
             (i32.add
              (select
               (i32.const 0)
               (get_local $18)
               (get_local $7)
              )
              (i32.or
               (get_local $7)
               (i32.ne
                (i32.and
                 (get_local $12)
                 (i32.const 255)
                )
                (i32.const 0)
               )
              )
             )
            )
            (set_local $16
             (select
              (i32.const 4)
              (get_local $16)
              (get_local $7)
             )
            )
            (set_local $14
             (i32.const 1)
            )
            (set_local $12
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
                       (get_local $2)
                       (i32.const -67108864)
                      )
                      (i32.const 24)
                     )
                     (get_local $4)
                    )
                    (i32.const 2)
                   )
                   (get_local $5)
                  )
                  (i32.const 136112)
                 )
                )
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
            (set_local $14
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
           (set_local $12
            (i32.const 1)
           )
          )
          (set_local $9
           (i32.add
            (get_local $9)
            (i32.const 4)
           )
          )
          (set_local $10
           (i32.add
            (get_local $10)
            (i32.const 16777216)
           )
          )
          (set_local $11
           (i32.add
            (get_local $11)
            (i32.const 1)
           )
          )
          (br_if $label$7
           (i32.lt_s
            (get_local $15)
            (i32.const 4)
           )
          )
          (br $label$0)
         )
        )
        (set_local $9
         (i32.add
          (i32.add
           (i32.mul
            (get_local $0)
            (i32.const 116)
           )
           (get_local $1)
          )
          (i32.const 136152)
         )
        )
        (set_local $0
         (i32.const -5)
        )
        (set_local $10
         (i32.const -134217728)
        )
        (set_local $13
         (i32.const 0)
        )
        (set_local $15
         (i32.const 0)
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
        (set_local $8
         (i32.const 0)
        )
        (set_local $16
         (i32.const 0)
        )
        (loop $label$14
         (set_local $11
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
                 (get_local $9)
                )
               )
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
             (get_local $0)
            )
           )
           (br $label$15)
          )
          (set_local $15
           (i32.add
            (get_local $15)
            (i32.const 1)
           )
          )
         )
         (set_local $0
          (i32.add
           (get_local $11)
           (i32.const 1)
          )
         )
         (block $label$17
          (br_if $label$17
           (i32.ne
            (i32.add
             (tee_local $7
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
          (block $label$18
           (block $label$19
            (br_if $label$19
             (i32.eq
              (get_local $7)
              (i32.const 4)
             )
            )
            (br_if $label$18
             (i32.ne
              (get_local $7)
              (i32.const 5)
             )
            )
            (br $label$4)
           )
           (set_local $19
            (select
             (select
              (get_local $0)
              (get_local $19)
              (tee_local $11
               (i32.lt_s
                (tee_local $7
                 (i32.shr_s
                  (i32.shl
                   (get_local $16)
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
              (get_local $11)
              (i32.eqz
               (tee_local $8
                (i32.and
                 (get_local $8)
                 (i32.const 255)
                )
               )
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
             (i32.and
              (i32.gt_s
               (get_local $7)
               (i32.const 3)
              )
              (i32.ne
               (get_local $8)
               (i32.const 0)
              )
             )
            )
           )
           (set_local $18
            (i32.add
             (select
              (i32.const 0)
              (get_local $18)
              (get_local $11)
             )
             (i32.or
              (get_local $11)
              (i32.ne
               (i32.and
                (get_local $14)
                (i32.const 255)
               )
               (i32.const 0)
              )
             )
            )
           )
           (set_local $16
            (select
             (i32.const 4)
             (get_local $16)
             (get_local $11)
            )
           )
           (set_local $8
            (i32.const 1)
           )
           (set_local $14
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
                     (get_local $10)
                     (i32.const 24)
                    )
                    (get_local $4)
                   )
                   (i32.const 2)
                  )
                  (get_local $5)
                 )
                 (i32.const 136112)
                )
               )
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
           (br $label$17)
          )
          (set_local $15
           (i32.add
            (get_local $15)
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
           (i32.const 16777216)
          )
         )
         (set_local $9
          (i32.add
           (get_local $9)
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
       (set_local $19
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (br_if $label$3
        (get_local $6)
       )
       (br $label$2)
      )
      (set_local $19
       (i32.add
        (get_local $11)
        (i32.const 1)
       )
      )
      (br_if $label$2
       (i32.eqz
        (get_local $6)
       )
      )
     )
     (set_local $17
      (i32.const 0)
     )
     (set_local $16
      (i32.const 28)
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
                  (get_local $19)
                  (i32.const 24)
                 )
                )
                (i32.const -83886080)
               )
               (i32.const 24)
              )
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 136112)
          )
         )
        )
       )
       (i32.const 1)
      )
     )
     (set_local $18
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
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 136112)
          )
         )
        )
       )
       (i32.const 1)
      )
     )
    )
    (set_local $17
     (i32.const 0)
    )
    (set_local $16
     (i32.const 5)
    )
   )
   (set_local $18
    (i32.const 0)
   )
  )
  (set_local $15
   (i32.or
    (i32.or
     (i32.shl
      (tee_local $3
       (i32.and
        (get_local $17)
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
      (get_local $19)
      (i32.const 255)
     )
     (i32.const 5)
    )
   )
  )
  (set_local $0
   (i32.const 9)
  )
  (block $label$21
   (br_if $label$21
    (get_local $3)
   )
   (set_local $0
    (i32.const 24)
   )
   (br_if $label$21
    (i32.gt_u
     (i32.and
      (get_local $18)
      (i32.const 255)
     )
     (i32.const 1)
    )
   )
   (set_local $0
    (i32.shl
     (i32.shr_s
      (i32.shl
       (get_local $16)
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
    (get_local $15)
    (get_local $0)
   )
   (i32.const 65535)
  )
 )
 (func $_Z13testLineThreehhcPc (; 26 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
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
  (i32.store8 offset=216336
   (i32.const 0)
   (i32.load8_u
    (i32.add
     (get_local $3)
     (i32.load8_u
      (i32.add
       (tee_local $12
        (i32.add
         (i32.mul
          (get_local $0)
          (i32.const 116)
         )
         (get_local $1)
        )
       )
       (i32.const 136148)
      )
     )
    )
   )
  )
  (i32.store8 offset=216337
   (i32.const 0)
   (tee_local $0
    (i32.load8_u
     (i32.add
      (get_local $3)
      (i32.load8_u
       (i32.add
        (get_local $12)
        (i32.const 136152)
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
       (set_local $8
        (i32.add
         (get_local $12)
         (i32.const 136156)
        )
       )
       (set_local $13
        (i32.const -5)
       )
       (set_local $11
        (i32.const 0)
       )
       (set_local $12
        (i32.const 0)
       )
       (set_local $17
        (i32.const 0)
       )
       (set_local $16
        (i32.const 0)
       )
       (set_local $15
        (i32.const 0)
       )
       (set_local $5
        (i32.const 0)
       )
       (set_local $6
        (i32.const 0)
       )
       (set_local $14
        (i32.const 0)
       )
       (loop $label$5
        (i32.store8
         (i32.add
          (tee_local $4
           (get_local $13)
          )
          (i32.const 216343)
         )
         (tee_local $9
          (i32.load8_u
           (i32.add
            (get_local $3)
            (i32.load8_u
             (get_local $8)
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
          (set_local $11
           (select
            (i32.add
             (get_local $11)
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
          (set_local $12
           (select
            (get_local $12)
            (i32.const 0)
            (get_local $0)
           )
          )
          (br $label$6)
         )
         (set_local $12
          (i32.add
           (get_local $12)
           (i32.const 1)
          )
         )
        )
        (set_local $13
         (i32.add
          (get_local $4)
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
               (get_local $11)
               (i32.const 255)
              )
             )
             (i32.and
              (get_local $12)
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
                    (set_local $10
                     (get_local $5)
                    )
                    (br $label$10)
                   )
                   (br_if $label$17
                    (i32.gt_s
                     (tee_local $0
                      (i32.shr_s
                       (i32.shl
                        (get_local $14)
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
                     (i32.load8_u offset=131104
                      (i32.const 0)
                     )
                     (i32.const 2)
                    )
                   )
                   (br_if $label$14
                    (i32.ne
                     (i32.load8_u
                      (i32.add
                       (get_local $4)
                       (i32.const 216337)
                      )
                     )
                     (i32.const 1)
                    )
                   )
                   (set_local $10
                    (get_local $5)
                   )
                   (br $label$10)
                  )
                  (br_if $label$15
                   (i32.ne
                    (i32.load8_u offset=131104
                     (i32.const 0)
                    )
                    (i32.const 2)
                   )
                  )
                  (br_if $label$16
                   (i32.ne
                    (i32.load8_u
                     (i32.add
                      (get_local $4)
                      (i32.const 216337)
                     )
                    )
                    (i32.const 1)
                   )
                  )
                 )
                 (set_local $10
                  (get_local $5)
                 )
                 (br $label$10)
                )
                (br_if $label$13
                 (i32.eq
                  (i32.and
                   (get_local $9)
                   (i32.const 255)
                  )
                  (i32.const 1)
                 )
                )
               )
               (set_local $17
                (select
                 (select
                  (get_local $13)
                  (get_local $17)
                  (tee_local $0
                   (i32.lt_s
                    (tee_local $7
                     (i32.shr_s
                      (i32.shl
                       (get_local $14)
                       (i32.const 24)
                      )
                      (i32.const 24)
                     )
                    )
                    (i32.const 4)
                   )
                  )
                 )
                 (get_local $13)
                 (i32.or
                  (get_local $0)
                  (i32.eqz
                   (tee_local $6
                    (i32.and
                     (get_local $6)
                     (i32.const 255)
                    )
                   )
                  )
                 )
                )
               )
               (set_local $10
                (i32.const 0)
               )
               (set_local $15
                (i32.add
                 (select
                  (i32.const 0)
                  (get_local $15)
                  (get_local $0)
                 )
                 (i32.and
                  (i32.gt_s
                   (get_local $7)
                   (i32.const 3)
                  )
                  (i32.ne
                   (get_local $6)
                   (i32.const 0)
                  )
                 )
                )
               )
               (set_local $16
                (i32.add
                 (select
                  (i32.const 0)
                  (get_local $16)
                  (get_local $0)
                 )
                 (i32.or
                  (get_local $0)
                  (i32.ne
                   (i32.and
                    (get_local $5)
                    (i32.const 255)
                   )
                   (i32.const 0)
                  )
                 )
                )
               )
               (set_local $14
                (select
                 (i32.const 4)
                 (get_local $14)
                 (get_local $0)
                )
               )
               (br $label$11)
              )
              (br_if $label$12
               (i32.ne
                (i32.and
                 (get_local $9)
                 (i32.const 255)
                )
                (i32.const 1)
               )
              )
             )
             (set_local $9
              (i32.const 1)
             )
             (set_local $10
              (get_local $5)
             )
             (br $label$10)
            )
            (set_local $14
             (i32.const 3)
            )
            (set_local $17
             (select
              (select
               (get_local $13)
               (get_local $17)
               (tee_local $7
                (i32.lt_s
                 (get_local $0)
                 (i32.const 3)
                )
               )
              )
              (get_local $13)
              (i32.or
               (get_local $7)
               (i32.eqz
                (tee_local $6
                 (i32.and
                  (get_local $6)
                  (i32.const 255)
                 )
                )
               )
              )
             )
            )
            (set_local $10
             (i32.const 0)
            )
            (set_local $15
             (i32.add
              (select
               (i32.const 0)
               (get_local $15)
               (get_local $7)
              )
              (i32.and
               (i32.gt_s
                (get_local $0)
                (i32.const 2)
               )
               (i32.ne
                (get_local $6)
                (i32.const 0)
               )
              )
             )
            )
            (set_local $16
             (i32.add
              (select
               (i32.const 0)
               (get_local $16)
               (get_local $7)
              )
              (i32.or
               (get_local $7)
               (i32.ne
                (i32.and
                 (get_local $5)
                 (i32.const 255)
                )
                (i32.const 0)
               )
              )
             )
            )
           )
           (set_local $6
            (i32.const 1)
           )
          )
          (block $label$20
           (br_if $label$20
            (i32.eqz
             (i32.load8_u
              (i32.add
               (get_local $4)
               (i32.const 216338)
              )
             )
            )
           )
           (set_local $11
            (i32.add
             (get_local $11)
             (i32.const -1)
            )
           )
           (set_local $6
            (i32.const 0)
           )
           (set_local $0
            (get_local $9)
           )
           (set_local $5
            (get_local $10)
           )
           (br $label$8)
          )
          (set_local $12
           (i32.add
            (get_local $12)
            (i32.const -1)
           )
          )
          (set_local $5
           (i32.const 1)
          )
         )
         (set_local $0
          (get_local $9)
         )
        )
        (set_local $8
         (i32.add
          (get_local $8)
          (i32.const 4)
         )
        )
        (br_if $label$5
         (i32.lt_s
          (get_local $13)
          (i32.const 4)
         )
        )
        (br $label$0)
       )
      )
      (set_local $8
       (i32.add
        (get_local $12)
        (i32.const 136156)
       )
      )
      (set_local $12
       (i32.const -5)
      )
      (set_local $11
       (i32.const 0)
      )
      (set_local $13
       (i32.const 0)
      )
      (set_local $17
       (i32.const 0)
      )
      (set_local $16
       (i32.const 0)
      )
      (set_local $15
       (i32.const 0)
      )
      (set_local $10
       (i32.const 0)
      )
      (set_local $5
       (i32.const 0)
      )
      (set_local $14
       (i32.const 0)
      )
      (loop $label$21
       (set_local $9
        (get_local $0)
       )
       (i32.store8
        (i32.add
         (tee_local $4
          (get_local $12)
         )
         (i32.const 216343)
        )
        (tee_local $0
         (i32.load8_u
          (i32.add
           (get_local $3)
           (i32.load8_u
            (get_local $8)
           )
          )
         )
        )
       )
       (block $label$22
        (block $label$23
         (br_if $label$23
          (i32.eqz
           (tee_local $12
            (i32.and
             (get_local $9)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $11
          (select
           (i32.add
            (get_local $11)
            (i32.const 1)
           )
           (i32.const 0)
           (tee_local $12
            (i32.eq
             (get_local $12)
             (i32.and
              (get_local $2)
              (i32.const 255)
             )
            )
           )
          )
         )
         (set_local $13
          (select
           (get_local $13)
           (i32.const 0)
           (get_local $12)
          )
         )
         (br $label$22)
        )
        (set_local $13
         (i32.add
          (get_local $13)
          (i32.const 1)
         )
        )
       )
       (set_local $12
        (i32.add
         (get_local $4)
         (i32.const 1)
        )
       )
       (block $label$24
        (br_if $label$24
         (i32.ne
          (i32.add
           (tee_local $9
            (i32.and
             (get_local $11)
             (i32.const 255)
            )
           )
           (i32.and
            (get_local $13)
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
              (get_local $9)
              (i32.const 3)
             )
            )
            (br_if $label$27
             (i32.eq
              (get_local $9)
              (i32.const 4)
             )
            )
            (br_if $label$25
             (i32.ne
              (get_local $9)
              (i32.const 5)
             )
            )
            (br $label$2)
           )
           (br_if $label$25
            (i32.gt_s
             (i32.shr_s
              (i32.shl
               (get_local $14)
               (i32.const 24)
              )
              (i32.const 24)
             )
             (i32.const 3)
            )
           )
           (set_local $6
            (i32.and
             (get_local $14)
             (i32.const 255)
            )
           )
           (set_local $14
            (i32.const 3)
           )
           (set_local $17
            (select
             (select
              (get_local $12)
              (get_local $17)
              (tee_local $9
               (i32.ne
                (get_local $6)
                (i32.const 3)
               )
              )
             )
             (get_local $12)
             (i32.or
              (get_local $9)
              (i32.eqz
               (tee_local $5
                (i32.and
                 (get_local $5)
                 (i32.const 255)
                )
               )
              )
             )
            )
           )
           (set_local $15
            (i32.add
             (select
              (i32.const 0)
              (get_local $15)
              (get_local $9)
             )
             (i32.and
              (i32.eq
               (get_local $6)
               (i32.const 3)
              )
              (i32.ne
               (get_local $5)
               (i32.const 0)
              )
             )
            )
           )
           (set_local $16
            (i32.add
             (select
              (i32.const 0)
              (get_local $16)
              (get_local $9)
             )
             (i32.or
              (get_local $9)
              (i32.ne
               (i32.and
                (get_local $10)
                (i32.const 255)
               )
               (i32.const 0)
              )
             )
            )
           )
           (br $label$26)
          )
          (set_local $17
           (select
            (select
             (get_local $12)
             (get_local $17)
             (tee_local $9
              (i32.lt_s
               (tee_local $6
                (i32.shr_s
                 (i32.shl
                  (get_local $14)
                  (i32.const 24)
                 )
                 (i32.const 24)
                )
               )
               (i32.const 4)
              )
             )
            )
            (get_local $12)
            (i32.or
             (get_local $9)
             (i32.eqz
              (tee_local $5
               (i32.and
                (get_local $5)
                (i32.const 255)
               )
              )
             )
            )
           )
          )
          (set_local $15
           (i32.add
            (select
             (i32.const 0)
             (get_local $15)
             (get_local $9)
            )
            (i32.and
             (i32.gt_s
              (get_local $6)
              (i32.const 3)
             )
             (i32.ne
              (get_local $5)
              (i32.const 0)
             )
            )
           )
          )
          (set_local $16
           (i32.add
            (select
             (i32.const 0)
             (get_local $16)
             (get_local $9)
            )
            (i32.or
             (get_local $9)
             (i32.ne
              (i32.and
               (get_local $10)
               (i32.const 255)
              )
              (i32.const 0)
             )
            )
           )
          )
          (set_local $14
           (select
            (i32.const 4)
            (get_local $14)
            (get_local $9)
           )
          )
         )
         (set_local $5
          (i32.const 1)
         )
         (set_local $10
          (i32.const 0)
         )
        )
        (block $label$29
         (br_if $label$29
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $4)
             (i32.const 216338)
            )
           )
          )
         )
         (set_local $11
          (i32.add
           (get_local $11)
           (i32.const -1)
          )
         )
         (set_local $5
          (i32.const 0)
         )
         (br $label$24)
        )
        (set_local $13
         (i32.add
          (get_local $13)
          (i32.const -1)
         )
        )
        (set_local $10
         (i32.const 1)
        )
       )
       (set_local $8
        (i32.add
         (get_local $8)
         (i32.const 4)
        )
       )
       (br_if $label$21
        (i32.lt_s
         (get_local $12)
         (i32.const 4)
        )
       )
       (br $label$0)
      )
     )
     (set_local $17
      (i32.add
       (get_local $4)
       (i32.const 1)
      )
     )
     (br $label$1)
    )
    (set_local $17
     (i32.add
      (get_local $4)
      (i32.const 1)
     )
    )
    (set_local $9
     (get_local $0)
    )
   )
   (set_local $15
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
        (i32.load8_u offset=131104
         (i32.const 0)
        )
        (i32.const 255)
       )
       (i32.const 2)
      )
     )
     (set_local $14
      (i32.const 28)
     )
     (br_if $label$30
      (i32.eq
       (i32.load8_u
        (i32.add
         (get_local $17)
         (i32.const 216336)
        )
       )
       (i32.const 1)
      )
     )
     (br_if $label$30
      (i32.eq
       (i32.and
        (get_local $9)
        (i32.const 255)
       )
       (i32.const 1)
      )
     )
    )
    (set_local $14
     (i32.const 5)
    )
   )
   (set_local $16
    (i32.const 0)
   )
  )
  (set_local $12
   (i32.or
    (i32.or
     (i32.shl
      (tee_local $0
       (i32.and
        (get_local $15)
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
      (get_local $17)
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
        (get_local $14)
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
          (get_local $14)
          (i32.const 24)
         )
         (i32.const 24)
        )
        (i32.const 1)
       )
      )
      (i32.gt_u
       (i32.and
        (get_local $16)
        (i32.const 255)
       )
       (i32.const 1)
      )
     )
     (get_local $0)
     (i32.eq
      (i32.and
       (get_local $14)
       (i32.const 255)
      )
      (i32.const 4)
     )
    )
   )
  )
  (i32.and
   (i32.or
    (get_local $12)
    (get_local $0)
   )
   (i32.const 65535)
  )
 )
 (func $_Z13testLinePointhhcPcPt (; 27 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
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
  (i64.store align=2
   (get_local $4)
   (i64.const 0)
  )
  (i32.store align=2
   (i32.add
    (get_local $4)
    (i32.const 16)
   )
   (i32.const 0)
  )
  (i64.store align=2
   (i32.add
    (get_local $4)
    (i32.const 8)
   )
   (i64.const 0)
  )
  (set_local $6
   (i32.add
    (get_local $1)
    (i32.const 56)
   )
  )
  (set_local $5
   (i32.mul
    (get_local $0)
    (i32.const 29)
   )
  )
  (set_local $13
   (i32.const -4)
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
  (loop $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.eqz
       (tee_local $0
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.load8_u
           (i32.add
            (i32.add
             (i32.shl
              (i32.add
               (get_local $13)
               (get_local $5)
              )
              (i32.const 2)
             )
             (get_local $6)
            )
            (i32.const 136112)
           )
          )
         )
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
     (set_local $19
      (select
       (get_local $19)
       (i32.const 0)
       (get_local $0)
      )
     )
     (set_local $17
      (select
       (get_local $17)
       (get_local $14)
       (get_local $0)
      )
     )
     (br $label$1)
    )
    (i32.store8
     (i32.add
      (tee_local $0
       (i32.and
        (get_local $14)
        (i32.const 255)
       )
      )
      (i32.const 216800)
     )
     (i32.add
      (get_local $13)
      (i32.const 4)
     )
    )
    (i32.store8
     (i32.add
      (get_local $0)
      (i32.const 216816)
     )
     (get_local $13)
    )
    (set_local $14
     (i32.add
      (get_local $14)
      (i32.const 1)
     )
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const 1)
     )
    )
   )
   (block $label$3
    (br_if $label$3
     (i32.ne
      (i32.add
       (i32.and
        (get_local $19)
        (i32.const 255)
       )
       (tee_local $7
        (i32.and
         (get_local $18)
         (i32.const 255)
        )
       )
      )
      (i32.const 5)
     )
    )
    (block $label$4
     (block $label$5
      (br_if $label$5
       (i32.ne
        (get_local $2)
        (i32.const 1)
       )
      )
      (br_if $label$5
       (i32.ne
        (i32.and
         (i32.load8_u offset=131104
          (i32.const 0)
         )
         (i32.const 255)
        )
        (i32.const 2)
       )
      )
      (block $label$6
       (br_if $label$6
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
                    (get_local $13)
                    (i32.const 24)
                   )
                  )
                  (i32.const -83886080)
                 )
                 (i32.const 24)
                )
                (get_local $5)
               )
               (i32.const 2)
              )
              (get_local $6)
             )
             (i32.const 136112)
            )
           )
          )
         )
         (i32.const 1)
        )
       )
       (br_if $label$5
        (i32.ne
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
                (get_local $5)
               )
               (i32.const 2)
              )
              (get_local $6)
             )
             (i32.const 136112)
            )
           )
          )
         )
         (i32.const 1)
        )
       )
      )
      (br_if $label$4
       (i32.ge_u
        (tee_local $0
         (i32.and
          (get_local $17)
          (i32.const 255)
         )
        )
        (tee_local $12
         (i32.and
          (get_local $14)
          (i32.const 255)
         )
        )
       )
      )
      (br_if $label$4
       (i32.ne
        (get_local $7)
        (i32.const 4)
       )
      )
      (loop $label$7
       (block $label$8
        (br_if $label$8
         (i32.lt_u
          (get_local $7)
          (i32.and
           (i32.load16_u
            (tee_local $16
             (i32.add
              (get_local $4)
              (i32.shl
               (i32.load8_u
                (i32.add
                 (get_local $0)
                 (i32.const 216800)
                )
               )
               (i32.const 1)
              )
             )
            )
           )
           (i32.const 14)
          )
         )
        )
        (i32.store16
         (get_local $16)
         (i32.or
          (i32.shl
           (i32.sub
            (get_local $13)
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.const 216816)
             )
            )
           )
           (i32.const 5)
          )
          (i32.const 28)
         )
        )
       )
       (br_if $label$7
        (i32.ne
         (get_local $12)
         (tee_local $0
          (i32.add
           (get_local $0)
           (i32.const 1)
          )
         )
        )
       )
       (br $label$4)
      )
     )
     (br_if $label$4
      (i32.ge_u
       (tee_local $0
        (i32.and
         (get_local $17)
         (i32.const 255)
        )
       )
       (tee_local $11
        (i32.and
         (get_local $14)
         (i32.const 255)
        )
       )
      )
     )
     (set_local $9
      (i32.shl
       (tee_local $8
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (i32.const 1)
      )
     )
     (loop $label$9
      (block $label$10
       (br_if $label$10
        (i32.gt_u
         (i32.shr_u
          (i32.and
           (tee_local $16
            (i32.load16_u
             (tee_local $10
              (i32.add
               (get_local $4)
               (i32.shl
                (tee_local $15
                 (i32.load8_u
                  (tee_local $12
                   (i32.add
                    (get_local $0)
                    (i32.const 216800)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
             )
            )
           )
           (i32.const 14)
          )
          (i32.const 1)
         )
         (get_local $7)
        )
       )
       (i32.store16
        (get_local $10)
        (i32.or
         (i32.or
          (get_local $9)
          (i32.shl
           (i32.sub
            (get_local $13)
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.const 216816)
             )
            )
           )
           (i32.const 5)
          )
         )
         (i32.const 32768)
        )
       )
       (set_local $16
        (i32.load16_u
         (i32.add
          (get_local $4)
          (i32.shl
           (tee_local $15
            (i32.load8_u
             (get_local $12)
            )
           )
           (i32.const 1)
          )
         )
        )
       )
      )
      (block $label$11
       (br_if $label$11
        (i32.ne
         (i32.and
          (i32.shr_u
           (tee_local $10
            (i32.and
             (get_local $16)
             (i32.const 65535)
            )
           )
           (i32.const 1)
          )
          (i32.const 7)
         )
         (get_local $8)
        )
       )
       (block $label$12
        (br_if $label$12
         (i32.eqz
          (i32.and
           (get_local $10)
           (i32.const 32768)
          )
         )
        )
        (i32.store16
         (i32.add
          (get_local $4)
          (i32.shl
           (get_local $15)
           (i32.const 1)
          )
         )
         (i32.add
          (get_local $10)
          (i32.const 4096)
         )
        )
        (set_local $16
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $15
             (i32.load8_u
              (get_local $12)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $15)
          (i32.const 1)
         )
        )
        (i32.and
         (get_local $16)
         (i32.const 32767)
        )
       )
       (block $label$13
        (br_if $label$13
         (i32.eqz
          (i32.and
           (tee_local $16
            (i32.load16_u
             (tee_local $10
              (i32.add
               (get_local $4)
               (i32.shl
                (tee_local $15
                 (i32.load8_u
                  (get_local $12)
                 )
                )
                (i32.const 1)
               )
              )
             )
            )
           )
           (i32.const 2048)
          )
         )
        )
        (i32.store16
         (get_local $10)
         (i32.add
          (get_local $16)
          (i32.const 256)
         )
        )
        (i32.store16
         (tee_local $16
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (get_local $12)
            )
            (i32.const 1)
           )
          )
         )
         (i32.or
          (i32.shl
           (i32.sub
            (get_local $13)
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.const 216816)
             )
            )
           )
           (i32.const 5)
          )
          (i32.and
           (i32.load16_u
            (get_local $16)
           )
           (i32.const 65311)
          )
         )
        )
        (set_local $16
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $15
             (i32.load8_u
              (get_local $12)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $15)
          (i32.const 1)
         )
        )
        (i32.or
         (get_local $16)
         (i32.const 2048)
        )
       )
      )
      (br_if $label$9
       (i32.ne
        (get_local $11)
        (tee_local $0
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
       )
      )
     )
    )
    (block $label$14
     (br_if $label$14
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
                (i32.shl
                 (get_local $13)
                 (i32.const 24)
                )
                (i32.const -67108864)
               )
               (i32.const 24)
              )
              (get_local $5)
             )
             (i32.const 2)
            )
            (get_local $6)
           )
           (i32.const 136112)
          )
         )
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
     (br_if $label$3
      (i32.ge_u
       (tee_local $0
        (i32.and
         (get_local $17)
         (i32.const 255)
        )
       )
       (tee_local $12
        (i32.and
         (get_local $14)
         (i32.const 255)
        )
       )
      )
     )
     (loop $label$15
      (i32.store16
       (tee_local $16
        (i32.add
         (get_local $4)
         (i32.shl
          (i32.load8_u
           (i32.add
            (get_local $0)
            (i32.const 216800)
           )
          )
          (i32.const 1)
         )
        )
       )
       (i32.and
        (i32.load16_u
         (get_local $16)
        )
        (i32.const 63487)
       )
      )
      (br_if $label$15
       (i32.ne
        (get_local $12)
        (tee_local $0
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
       )
      )
      (br $label$3)
     )
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const -1)
     )
    )
    (br_if $label$3
     (i32.ge_u
      (tee_local $0
       (i32.and
        (tee_local $17
         (i32.add
          (get_local $17)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
      )
      (tee_local $15
       (i32.and
        (get_local $14)
        (i32.const 255)
       )
      )
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 216800)
     )
    )
    (set_local $16
     (get_local $17)
    )
    (loop $label$16
     (i32.store16
      (tee_local $12
       (i32.add
        (get_local $4)
        (i32.shl
         (i32.load8_u
          (get_local $0)
         )
         (i32.const 1)
        )
       )
      )
      (i32.or
       (i32.load16_u
        (get_local $12)
       )
       (i32.const 32768)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$16
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
       (get_local $15)
      )
     )
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $13
      (i32.add
       (get_local $13)
       (i32.const 1)
      )
     )
     (i32.const 5)
    )
   )
  )
  (block $label$17
   (br_if $label$17
    (i32.eqz
     (tee_local $7
      (i32.and
       (get_local $14)
       (i32.const 255)
      )
     )
    )
   )
   (set_local $11
    (i32.shl
     (get_local $1)
     (i32.const 12)
    )
   )
   (set_local $16
    (i32.const 0)
   )
   (loop $label$18
    (block $label$19
     (br_if $label$19
      (i32.eqz
       (tee_local $0
        (i32.load16_u
         (tee_local $15
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (i32.add
              (get_local $16)
              (i32.const 216800)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
      )
     )
     (set_local $13
      (i32.and
       (get_local $0)
       (i32.const 1792)
      )
     )
     (set_local $12
      (i32.const 1)
     )
     (block $label$20
      (br_if $label$20
       (i32.eq
        (tee_local $10
         (i32.and
          (i32.shr_u
           (get_local $0)
           (i32.const 1)
          )
          (i32.const 7)
         )
        )
        (i32.const 6)
       )
      )
      (block $label$21
       (br_if $label$21
        (i32.ne
         (get_local $10)
         (i32.const 4)
        )
       )
       (set_local $12
        (i32.and
         (i32.gt_u
          (i32.and
           (get_local $0)
           (i32.const 28672)
          )
          (i32.const 4096)
         )
         (i32.eqz
          (get_local $13)
         )
        )
       )
       (br $label$20)
      )
      (set_local $12
       (i32.const 0)
      )
     )
     (i32.store16
      (get_local $15)
      (i32.or
       (i32.or
        (i32.or
         (i32.or
          (i32.and
           (get_local $0)
           (i32.const 14)
          )
          (get_local $11)
         )
         (i32.ne
          (get_local $13)
          (i32.const 0)
         )
        )
        (i32.shl
         (get_local $12)
         (i32.const 4)
        )
       )
       (i32.and
        (get_local $0)
        (i32.const 2016)
       )
      )
     )
    )
    (br_if $label$18
     (i32.ne
      (get_local $7)
      (tee_local $16
       (i32.add
        (get_local $16)
        (i32.const 1)
       )
      )
     )
    )
   )
  )
 )
 (func $_Z17testLinePointFourhhcPcPt (; 28 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
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
  (i64.store align=2
   (get_local $4)
   (i64.const 0)
  )
  (i32.store align=2
   (i32.add
    (get_local $4)
    (i32.const 16)
   )
   (i32.const 0)
  )
  (i64.store align=2
   (i32.add
    (get_local $4)
    (i32.const 8)
   )
   (i64.const 0)
  )
  (set_local $6
   (i32.add
    (get_local $1)
    (i32.const 56)
   )
  )
  (set_local $5
   (i32.mul
    (get_local $0)
    (i32.const 29)
   )
  )
  (set_local $11
   (i32.const -4)
  )
  (set_local $16
   (i32.const 0)
  )
  (set_local $12
   (i32.const 0)
  )
  (set_local $15
   (i32.const 0)
  )
  (set_local $14
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.eqz
       (tee_local $0
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.load8_u
           (i32.add
            (i32.add
             (i32.shl
              (i32.add
               (get_local $11)
               (get_local $5)
              )
              (i32.const 2)
             )
             (get_local $6)
            )
            (i32.const 136112)
           )
          )
         )
        )
       )
      )
     )
     (set_local $14
      (select
       (i32.add
        (get_local $14)
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
     (set_local $16
      (select
       (get_local $16)
       (i32.const 0)
       (get_local $0)
      )
     )
     (set_local $15
      (select
       (get_local $15)
       (get_local $12)
       (get_local $0)
      )
     )
     (br $label$1)
    )
    (i32.store8
     (i32.add
      (tee_local $0
       (i32.and
        (get_local $12)
        (i32.const 255)
       )
      )
      (i32.const 216800)
     )
     (i32.add
      (get_local $11)
      (i32.const 4)
     )
    )
    (i32.store8
     (i32.add
      (get_local $0)
      (i32.const 216816)
     )
     (get_local $11)
    )
    (set_local $12
     (i32.add
      (get_local $12)
      (i32.const 1)
     )
    )
    (set_local $16
     (i32.add
      (get_local $16)
      (i32.const 1)
     )
    )
   )
   (block $label$3
    (br_if $label$3
     (i32.ne
      (i32.add
       (i32.and
        (get_local $16)
        (i32.const 255)
       )
       (tee_local $0
        (i32.and
         (get_local $14)
         (i32.const 255)
        )
       )
      )
      (i32.const 5)
     )
    )
    (block $label$4
     (block $label$5
      (block $label$6
       (block $label$7
        (block $label$8
         (br_if $label$8
          (i32.eq
           (get_local $0)
           (i32.const 3)
          )
         )
         (br_if $label$4
          (i32.ne
           (get_local $0)
           (i32.const 4)
          )
         )
         (br_if $label$7
          (i32.ne
           (get_local $2)
           (i32.const 1)
          )
         )
         (br_if $label$7
          (i32.ne
           (i32.and
            (i32.load8_u offset=131104
             (i32.const 0)
            )
            (i32.const 255)
           )
           (i32.const 2)
          )
         )
         (block $label$9
          (br_if $label$9
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
                       (get_local $11)
                       (i32.const 24)
                      )
                     )
                     (i32.const -83886080)
                    )
                    (i32.const 24)
                   )
                   (get_local $5)
                  )
                  (i32.const 2)
                 )
                 (get_local $6)
                )
                (i32.const 136112)
               )
              )
             )
            )
            (i32.const 1)
           )
          )
          (br_if $label$7
           (i32.ne
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
                   (get_local $5)
                  )
                  (i32.const 2)
                 )
                 (get_local $6)
                )
                (i32.const 136112)
               )
              )
             )
            )
            (i32.const 1)
           )
          )
         )
         (br_if $label$4
          (i32.ge_u
           (tee_local $0
            (i32.and
             (get_local $15)
             (i32.const 255)
            )
           )
           (tee_local $9
            (i32.and
             (get_local $12)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$10
          (i32.store16
           (i32.add
            (get_local $4)
            (i32.shl
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 216800)
              )
             )
             (i32.const 1)
            )
           )
           (i32.or
            (i32.shl
             (i32.sub
              (get_local $11)
              (i32.load8_u
               (i32.add
                (get_local $0)
                (i32.const 216816)
               )
              )
             )
             (i32.const 5)
            )
            (i32.const 28)
           )
          )
          (br_if $label$10
           (i32.ne
            (get_local $9)
            (tee_local $0
             (i32.add
              (get_local $0)
              (i32.const 1)
             )
            )
           )
          )
          (br $label$4)
         )
        )
        (br_if $label$6
         (i32.ne
          (get_local $2)
          (i32.const 1)
         )
        )
        (br_if $label$6
         (i32.ne
          (i32.and
           (i32.load8_u offset=131104
            (i32.const 0)
           )
           (i32.const 255)
          )
          (i32.const 2)
         )
        )
        (br_if $label$4
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
                     (get_local $11)
                     (i32.const 24)
                    )
                   )
                   (i32.const -83886080)
                  )
                  (i32.const 24)
                 )
                 (get_local $5)
                )
                (i32.const 2)
               )
               (get_local $6)
              )
              (i32.const 136112)
             )
            )
           )
          )
          (i32.const 1)
         )
        )
        (br_if $label$4
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
                 (get_local $5)
                )
                (i32.const 2)
               )
               (get_local $6)
              )
              (i32.const 136112)
             )
            )
           )
          )
          (i32.const 1)
         )
        )
        (br_if $label$5
         (i32.lt_u
          (i32.and
           (get_local $15)
           (i32.const 255)
          )
          (i32.and
           (get_local $12)
           (i32.const 255)
          )
         )
        )
        (br $label$4)
       )
       (br_if $label$4
        (i32.ge_u
         (tee_local $0
          (i32.and
           (get_local $15)
           (i32.const 255)
          )
         )
         (tee_local $9
          (i32.and
           (get_local $12)
           (i32.const 255)
          )
         )
        )
       )
       (loop $label$11
        (i32.store16
         (i32.add
          (get_local $4)
          (i32.shl
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.const 216800)
            )
           )
           (i32.const 1)
          )
         )
         (i32.or
          (i32.shl
           (i32.sub
            (get_local $11)
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.const 216816)
             )
            )
           )
           (i32.const 5)
          )
          (i32.const 10)
         )
        )
        (br_if $label$11
         (i32.ne
          (get_local $9)
          (tee_local $0
           (i32.add
            (get_local $0)
            (i32.const 1)
           )
          )
         )
        )
        (br $label$4)
       )
      )
      (br_if $label$4
       (i32.ge_u
        (i32.and
         (get_local $15)
         (i32.const 255)
        )
        (i32.and
         (get_local $12)
         (i32.const 255)
        )
       )
      )
     )
     (set_local $7
      (i32.and
       (get_local $12)
       (i32.const 255)
      )
     )
     (set_local $0
      (i32.and
       (get_local $15)
       (i32.const 255)
      )
     )
     (loop $label$12
      (block $label$13
       (br_if $label$13
        (i32.gt_u
         (i32.and
          (tee_local $9
           (i32.load16_u
            (tee_local $8
             (i32.add
              (get_local $4)
              (i32.shl
               (tee_local $13
                (i32.load8_u
                 (tee_local $10
                  (i32.add
                   (get_local $0)
                   (i32.const 216800)
                  )
                 )
                )
               )
               (i32.const 1)
              )
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
        (get_local $8)
        (i32.or
         (i32.shl
          (i32.sub
           (get_local $11)
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.const 216816)
            )
           )
          )
          (i32.const 5)
         )
         (i32.const 32776)
        )
       )
       (set_local $9
        (i32.load16_u
         (i32.add
          (get_local $4)
          (i32.shl
           (tee_local $13
            (i32.load8_u
             (get_local $10)
            )
           )
           (i32.const 1)
          )
         )
        )
       )
      )
      (block $label$14
       (br_if $label$14
        (i32.ne
         (i32.and
          (get_local $9)
          (i32.const 14)
         )
         (i32.const 8)
        )
       )
       (block $label$15
        (br_if $label$15
         (i32.eqz
          (i32.and
           (tee_local $8
            (i32.and
             (get_local $9)
             (i32.const 65535)
            )
           )
           (i32.const 32768)
          )
         )
        )
        (i32.store16
         (i32.add
          (get_local $4)
          (i32.shl
           (get_local $13)
           (i32.const 1)
          )
         )
         (i32.add
          (get_local $8)
          (i32.const 4096)
         )
        )
        (set_local $9
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $13
             (i32.load8_u
              (get_local $10)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $13)
          (i32.const 1)
         )
        )
        (i32.and
         (get_local $9)
         (i32.const 32767)
        )
       )
       (block $label$16
        (br_if $label$16
         (i32.eqz
          (i32.and
           (tee_local $9
            (i32.load16_u
             (tee_local $8
              (i32.add
               (get_local $4)
               (i32.shl
                (tee_local $13
                 (i32.load8_u
                  (get_local $10)
                 )
                )
                (i32.const 1)
               )
              )
             )
            )
           )
           (i32.const 2048)
          )
         )
        )
        (i32.store16
         (get_local $8)
         (i32.add
          (get_local $9)
          (i32.const 256)
         )
        )
        (i32.store16
         (tee_local $9
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (get_local $10)
            )
            (i32.const 1)
           )
          )
         )
         (i32.or
          (i32.shl
           (i32.sub
            (get_local $11)
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.const 216816)
             )
            )
           )
           (i32.const 5)
          )
          (i32.and
           (i32.load16_u
            (get_local $9)
           )
           (i32.const 65311)
          )
         )
        )
        (set_local $9
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $13
             (i32.load8_u
              (get_local $10)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $13)
          (i32.const 1)
         )
        )
        (i32.or
         (get_local $9)
         (i32.const 2048)
        )
       )
      )
      (br_if $label$12
       (i32.ne
        (get_local $7)
        (tee_local $0
         (i32.add
          (get_local $0)
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
         (get_local $3)
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (i32.shl
                 (get_local $11)
                 (i32.const 24)
                )
                (i32.const -67108864)
               )
               (i32.const 24)
              )
              (get_local $5)
             )
             (i32.const 2)
            )
            (get_local $6)
           )
           (i32.const 136112)
          )
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
     (br_if $label$3
      (i32.ge_u
       (tee_local $0
        (i32.and
         (get_local $15)
         (i32.const 255)
        )
       )
       (tee_local $10
        (i32.and
         (get_local $12)
         (i32.const 255)
        )
       )
      )
     )
     (loop $label$18
      (i32.store16
       (tee_local $9
        (i32.add
         (get_local $4)
         (i32.shl
          (i32.load8_u
           (i32.add
            (get_local $0)
            (i32.const 216800)
           )
          )
          (i32.const 1)
         )
        )
       )
       (i32.and
        (i32.load16_u
         (get_local $9)
        )
        (i32.const 63487)
       )
      )
      (br_if $label$18
       (i32.ne
        (get_local $10)
        (tee_local $0
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
       )
      )
      (br $label$3)
     )
    )
    (set_local $16
     (i32.add
      (get_local $16)
      (i32.const -1)
     )
    )
    (br_if $label$3
     (i32.ge_u
      (tee_local $0
       (i32.and
        (tee_local $15
         (i32.add
          (get_local $15)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
      )
      (tee_local $13
       (i32.and
        (get_local $12)
        (i32.const 255)
       )
      )
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 216800)
     )
    )
    (set_local $9
     (get_local $15)
    )
    (loop $label$19
     (i32.store16
      (tee_local $10
       (i32.add
        (get_local $4)
        (i32.shl
         (i32.load8_u
          (get_local $0)
         )
         (i32.const 1)
        )
       )
      )
      (i32.or
       (i32.load16_u
        (get_local $10)
       )
       (i32.const 32768)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$19
      (i32.lt_u
       (i32.and
        (tee_local $9
         (i32.add
          (get_local $9)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
       (get_local $13)
      )
     )
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $11
      (i32.add
       (get_local $11)
       (i32.const 1)
      )
     )
     (i32.const 5)
    )
   )
  )
  (block $label$20
   (br_if $label$20
    (i32.eqz
     (tee_local $13
      (i32.and
       (get_local $12)
       (i32.const 255)
      )
     )
    )
   )
   (set_local $16
    (i32.shl
     (get_local $1)
     (i32.const 12)
    )
   )
   (set_local $0
    (i32.const 0)
   )
   (loop $label$21
    (block $label$22
     (br_if $label$22
      (i32.eqz
       (tee_local $9
        (i32.load16_u
         (tee_local $11
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.const 216800)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
      )
     )
     (set_local $10
      (i32.const 9)
     )
     (block $label$23
      (br_if $label$23
       (i32.and
        (get_local $9)
        (i32.const 1792)
       )
      )
      (set_local $10
       (select
        (i32.const 24)
        (i32.and
         (get_local $9)
         (i32.const 30)
        )
        (i32.gt_u
         (i32.and
          (get_local $9)
          (i32.const 28672)
         )
         (i32.const 4096)
        )
       )
      )
     )
     (i32.store16
      (get_local $11)
      (i32.or
       (i32.or
        (i32.and
         (get_local $9)
         (i32.const 2016)
        )
        (get_local $16)
       )
       (get_local $10)
      )
     )
    )
    (br_if $label$21
     (i32.ne
      (get_local $13)
      (tee_local $0
       (i32.add
        (get_local $0)
        (i32.const 1)
       )
      )
     )
    )
   )
  )
 )
 (func $_Z18testLinePointThreehhcPcPt (; 29 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
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
  (i64.store align=2
   (get_local $4)
   (i64.const 0)
  )
  (i32.store align=2
   (i32.add
    (get_local $4)
    (i32.const 16)
   )
   (i32.const 0)
  )
  (i64.store align=2
   (i32.add
    (get_local $4)
    (i32.const 8)
   )
   (i64.const 0)
  )
  (set_local $6
   (i32.add
    (get_local $1)
    (i32.const 56)
   )
  )
  (set_local $5
   (i32.mul
    (get_local $0)
    (i32.const 29)
   )
  )
  (set_local $14
   (i32.const -4)
  )
  (set_local $19
   (i32.const 0)
  )
  (set_local $18
   (i32.const 0)
  )
  (set_local $15
   (i32.const 0)
  )
  (set_local $17
   (i32.const 0)
  )
  (loop $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.eqz
       (tee_local $0
        (i32.load8_u
         (i32.add
          (get_local $3)
          (i32.load8_u
           (i32.add
            (i32.add
             (i32.shl
              (i32.add
               (get_local $14)
               (get_local $5)
              )
              (i32.const 2)
             )
             (get_local $6)
            )
            (i32.const 136112)
           )
          )
         )
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
     (set_local $19
      (select
       (get_local $19)
       (i32.const 0)
       (get_local $0)
      )
     )
     (set_local $17
      (select
       (get_local $17)
       (get_local $15)
       (get_local $0)
      )
     )
     (br $label$1)
    )
    (i32.store8
     (i32.add
      (tee_local $0
       (i32.and
        (get_local $15)
        (i32.const 255)
       )
      )
      (i32.const 216800)
     )
     (i32.add
      (get_local $14)
      (i32.const 4)
     )
    )
    (i32.store8
     (i32.add
      (get_local $0)
      (i32.const 216816)
     )
     (get_local $14)
    )
    (set_local $15
     (i32.add
      (get_local $15)
      (i32.const 1)
     )
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const 1)
     )
    )
   )
   (block $label$3
    (br_if $label$3
     (i32.ne
      (i32.add
       (i32.and
        (get_local $19)
        (i32.const 255)
       )
       (tee_local $7
        (i32.and
         (get_local $18)
         (i32.const 255)
        )
       )
      )
      (i32.const 5)
     )
    )
    (block $label$4
     (block $label$5
      (block $label$6
       (block $label$7
        (block $label$8
         (br_if $label$8
          (i32.ne
           (get_local $7)
           (i32.const 4)
          )
         )
         (br_if $label$7
          (i32.ne
           (get_local $2)
           (i32.const 1)
          )
         )
         (br_if $label$7
          (i32.ne
           (i32.and
            (i32.load8_u offset=131104
             (i32.const 0)
            )
            (i32.const 255)
           )
           (i32.const 2)
          )
         )
         (block $label$9
          (br_if $label$9
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
                       (get_local $14)
                       (i32.const 24)
                      )
                     )
                     (i32.const -83886080)
                    )
                    (i32.const 24)
                   )
                   (get_local $5)
                  )
                  (i32.const 2)
                 )
                 (get_local $6)
                )
                (i32.const 136112)
               )
              )
             )
            )
            (i32.const 1)
           )
          )
          (br_if $label$7
           (i32.ne
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
                   (get_local $5)
                  )
                  (i32.const 2)
                 )
                 (get_local $6)
                )
                (i32.const 136112)
               )
              )
             )
            )
            (i32.const 1)
           )
          )
         )
         (br_if $label$4
          (i32.ge_u
           (tee_local $0
            (i32.and
             (get_local $17)
             (i32.const 255)
            )
           )
           (tee_local $12
            (i32.and
             (get_local $15)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$10
          (i32.store16
           (i32.add
            (get_local $4)
            (i32.shl
             (i32.load8_u
              (i32.add
               (get_local $0)
               (i32.const 216800)
              )
             )
             (i32.const 1)
            )
           )
           (i32.or
            (i32.shl
             (i32.sub
              (get_local $14)
              (i32.load8_u
               (i32.add
                (get_local $0)
                (i32.const 216816)
               )
              )
             )
             (i32.const 5)
            )
            (i32.const 28)
           )
          )
          (br_if $label$10
           (i32.ne
            (get_local $12)
            (tee_local $0
             (i32.add
              (get_local $0)
              (i32.const 1)
             )
            )
           )
          )
          (br $label$4)
         )
        )
        (br_if $label$4
         (i32.ne
          (i32.and
           (get_local $18)
           (i32.const 254)
          )
          (i32.const 2)
         )
        )
        (br_if $label$6
         (i32.ne
          (get_local $2)
          (i32.const 1)
         )
        )
        (br_if $label$6
         (i32.ne
          (i32.and
           (i32.load8_u offset=131104
            (i32.const 0)
           )
           (i32.const 255)
          )
          (i32.const 2)
         )
        )
        (br_if $label$4
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
                     (get_local $14)
                     (i32.const 24)
                    )
                   )
                   (i32.const -83886080)
                  )
                  (i32.const 24)
                 )
                 (get_local $5)
                )
                (i32.const 2)
               )
               (get_local $6)
              )
              (i32.const 136112)
             )
            )
           )
          )
          (i32.const 1)
         )
        )
        (br_if $label$4
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
                 (get_local $5)
                )
                (i32.const 2)
               )
               (get_local $6)
              )
              (i32.const 136112)
             )
            )
           )
          )
          (i32.const 1)
         )
        )
        (br_if $label$5
         (i32.lt_u
          (i32.and
           (get_local $17)
           (i32.const 255)
          )
          (i32.and
           (get_local $15)
           (i32.const 255)
          )
         )
        )
        (br $label$4)
       )
       (br_if $label$4
        (i32.ge_u
         (tee_local $0
          (i32.and
           (get_local $17)
           (i32.const 255)
          )
         )
         (tee_local $12
          (i32.and
           (get_local $15)
           (i32.const 255)
          )
         )
        )
       )
       (loop $label$11
        (i32.store16
         (i32.add
          (get_local $4)
          (i32.shl
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.const 216800)
            )
           )
           (i32.const 1)
          )
         )
         (i32.or
          (i32.shl
           (i32.sub
            (get_local $14)
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.const 216816)
             )
            )
           )
           (i32.const 5)
          )
          (i32.const 10)
         )
        )
        (br_if $label$11
         (i32.ne
          (get_local $12)
          (tee_local $0
           (i32.add
            (get_local $0)
            (i32.const 1)
           )
          )
         )
        )
        (br $label$4)
       )
      )
      (br_if $label$4
       (i32.ge_u
        (i32.and
         (get_local $17)
         (i32.const 255)
        )
        (i32.and
         (get_local $15)
         (i32.const 255)
        )
       )
      )
     )
     (set_local $10
      (i32.and
       (get_local $15)
       (i32.const 255)
      )
     )
     (set_local $0
      (i32.and
       (get_local $17)
       (i32.const 255)
      )
     )
     (set_local $9
      (i32.shl
       (tee_local $8
        (i32.add
         (get_local $7)
         (i32.const 1)
        )
       )
       (i32.const 1)
      )
     )
     (loop $label$12
      (block $label$13
       (br_if $label$13
        (i32.gt_u
         (i32.shr_u
          (i32.and
           (tee_local $12
            (i32.load16_u
             (tee_local $11
              (i32.add
               (get_local $4)
               (i32.shl
                (tee_local $16
                 (i32.load8_u
                  (tee_local $13
                   (i32.add
                    (get_local $0)
                    (i32.const 216800)
                   )
                  )
                 )
                )
                (i32.const 1)
               )
              )
             )
            )
           )
           (i32.const 14)
          )
          (i32.const 1)
         )
         (get_local $7)
        )
       )
       (i32.store16
        (get_local $11)
        (i32.or
         (i32.or
          (get_local $9)
          (i32.shl
           (i32.sub
            (get_local $14)
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.const 216816)
             )
            )
           )
           (i32.const 5)
          )
         )
         (i32.const 32768)
        )
       )
       (set_local $12
        (i32.load16_u
         (i32.add
          (get_local $4)
          (i32.shl
           (tee_local $16
            (i32.load8_u
             (get_local $13)
            )
           )
           (i32.const 1)
          )
         )
        )
       )
      )
      (block $label$14
       (br_if $label$14
        (i32.ne
         (i32.and
          (i32.shr_u
           (tee_local $11
            (i32.and
             (get_local $12)
             (i32.const 65535)
            )
           )
           (i32.const 1)
          )
          (i32.const 7)
         )
         (get_local $8)
        )
       )
       (block $label$15
        (br_if $label$15
         (i32.eqz
          (i32.and
           (get_local $11)
           (i32.const 32768)
          )
         )
        )
        (i32.store16
         (i32.add
          (get_local $4)
          (i32.shl
           (get_local $16)
           (i32.const 1)
          )
         )
         (i32.add
          (get_local $11)
          (i32.const 4096)
         )
        )
        (set_local $12
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $16
             (i32.load8_u
              (get_local $13)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $16)
          (i32.const 1)
         )
        )
        (i32.and
         (get_local $12)
         (i32.const 32767)
        )
       )
       (block $label$16
        (br_if $label$16
         (i32.eqz
          (i32.and
           (tee_local $12
            (i32.load16_u
             (tee_local $11
              (i32.add
               (get_local $4)
               (i32.shl
                (tee_local $16
                 (i32.load8_u
                  (get_local $13)
                 )
                )
                (i32.const 1)
               )
              )
             )
            )
           )
           (i32.const 2048)
          )
         )
        )
        (i32.store16
         (get_local $11)
         (i32.add
          (get_local $12)
          (i32.const 256)
         )
        )
        (i32.store16
         (tee_local $12
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (get_local $13)
            )
            (i32.const 1)
           )
          )
         )
         (i32.or
          (i32.shl
           (i32.sub
            (get_local $14)
            (i32.load8_u
             (i32.add
              (get_local $0)
              (i32.const 216816)
             )
            )
           )
           (i32.const 5)
          )
          (i32.and
           (i32.load16_u
            (get_local $12)
           )
           (i32.const 65311)
          )
         )
        )
        (set_local $12
         (i32.load16_u
          (i32.add
           (get_local $4)
           (i32.shl
            (tee_local $16
             (i32.load8_u
              (get_local $13)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
       (i32.store16
        (i32.add
         (get_local $4)
         (i32.shl
          (get_local $16)
          (i32.const 1)
         )
        )
        (i32.or
         (get_local $12)
         (i32.const 2048)
        )
       )
      )
      (br_if $label$12
       (i32.ne
        (get_local $10)
        (tee_local $0
         (i32.add
          (get_local $0)
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
         (get_local $3)
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (i32.shl
                 (get_local $14)
                 (i32.const 24)
                )
                (i32.const -67108864)
               )
               (i32.const 24)
              )
              (get_local $5)
             )
             (i32.const 2)
            )
            (get_local $6)
           )
           (i32.const 136112)
          )
         )
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
     (br_if $label$3
      (i32.ge_u
       (tee_local $0
        (i32.and
         (get_local $17)
         (i32.const 255)
        )
       )
       (tee_local $13
        (i32.and
         (get_local $15)
         (i32.const 255)
        )
       )
      )
     )
     (loop $label$18
      (i32.store16
       (tee_local $12
        (i32.add
         (get_local $4)
         (i32.shl
          (i32.load8_u
           (i32.add
            (get_local $0)
            (i32.const 216800)
           )
          )
          (i32.const 1)
         )
        )
       )
       (i32.and
        (i32.load16_u
         (get_local $12)
        )
        (i32.const 63487)
       )
      )
      (br_if $label$18
       (i32.ne
        (get_local $13)
        (tee_local $0
         (i32.add
          (get_local $0)
          (i32.const 1)
         )
        )
       )
      )
      (br $label$3)
     )
    )
    (set_local $19
     (i32.add
      (get_local $19)
      (i32.const -1)
     )
    )
    (br_if $label$3
     (i32.ge_u
      (tee_local $0
       (i32.and
        (tee_local $17
         (i32.add
          (get_local $17)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
      )
      (tee_local $16
       (i32.and
        (get_local $15)
        (i32.const 255)
       )
      )
     )
    )
    (set_local $0
     (i32.add
      (get_local $0)
      (i32.const 216800)
     )
    )
    (set_local $12
     (get_local $17)
    )
    (loop $label$19
     (i32.store16
      (tee_local $13
       (i32.add
        (get_local $4)
        (i32.shl
         (i32.load8_u
          (get_local $0)
         )
         (i32.const 1)
        )
       )
      )
      (i32.or
       (i32.load16_u
        (get_local $13)
       )
       (i32.const 32768)
      )
     )
     (set_local $0
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (br_if $label$19
      (i32.lt_u
       (i32.and
        (tee_local $12
         (i32.add
          (get_local $12)
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
   (br_if $label$0
    (i32.ne
     (tee_local $14
      (i32.add
       (get_local $14)
       (i32.const 1)
      )
     )
     (i32.const 5)
    )
   )
  )
  (block $label$20
   (br_if $label$20
    (i32.eqz
     (tee_local $16
      (i32.and
       (get_local $15)
       (i32.const 255)
      )
     )
    )
   )
   (set_local $19
    (i32.shl
     (get_local $1)
     (i32.const 12)
    )
   )
   (set_local $12
    (i32.const 0)
   )
   (loop $label$21
    (block $label$22
     (br_if $label$22
      (i32.eqz
       (tee_local $0
        (i32.load16_u
         (tee_local $14
          (i32.add
           (get_local $4)
           (i32.shl
            (i32.load8_u
             (i32.add
              (get_local $12)
              (i32.const 216800)
             )
            )
            (i32.const 1)
           )
          )
         )
        )
       )
      )
     )
     (set_local $13
      (i32.and
       (i32.shr_u
        (get_local $0)
        (i32.const 1)
       )
       (i32.const 15)
      )
     )
     (block $label$23
      (block $label$24
       (br_if $label$24
        (i32.eqz
         (i32.and
          (get_local $0)
          (i32.const 1792)
         )
        )
       )
       (set_local $13
        (select
         (i32.const 9)
         (i32.const 7)
         (i32.eq
          (get_local $13)
          (i32.const 4)
         )
        )
       )
       (br $label$23)
      )
      (set_local $13
       (select
        (select
         (i32.const 24)
         (tee_local $18
          (i32.shl
           (get_local $13)
           (i32.const 1)
          )
         )
         (i32.eq
          (get_local $13)
          (i32.const 4)
         )
        )
        (get_local $18)
        (i32.gt_u
         (i32.and
          (get_local $0)
          (i32.const 28672)
         )
         (i32.const 4096)
        )
       )
      )
     )
     (i32.store16
      (get_local $14)
      (i32.or
       (i32.or
        (i32.and
         (get_local $13)
         (i32.const 255)
        )
        (get_local $19)
       )
       (i32.and
        (get_local $0)
        (i32.const 2016)
       )
      )
     )
    )
    (br_if $label$21
     (i32.ne
      (get_local $16)
      (tee_local $12
       (i32.add
        (get_local $12)
        (i32.const 1)
       )
      )
     )
    )
   )
  )
 )
 (func $_Z17getBlockFourPointhPct (; 30 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (block $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.eq
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
             (tee_local $4
              (i32.mul
               (get_local $0)
               (i32.const 29)
              )
             )
            )
            (i32.const 2)
           )
           (tee_local $5
            (i32.or
             (i32.shr_u
              (get_local $2)
              (i32.const 12)
             )
             (i32.const 56)
            )
           )
          )
          (i32.const 136112)
         )
        )
       )
       (get_local $0)
      )
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $2)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (block $label$3
     (br_if $label$3
      (i32.eq
       (tee_local $2
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (tee_local $6
                (i32.shl
                 (get_local $3)
                 (i32.const 24)
                )
               )
               (i32.const -16777216)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 136112)
         )
        )
       )
       (get_local $0)
      )
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $2)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (block $label$4
     (br_if $label$4
      (i32.eq
       (tee_local $2
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (get_local $6)
               (i32.const -33554432)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 136112)
         )
        )
       )
       (get_local $0)
      )
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $2)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (br_if $label$0
     (i32.eq
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
            (get_local $4)
           )
           (i32.const 2)
          )
          (get_local $5)
         )
         (i32.const 136112)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$0
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $2)
       )
      )
      (i32.const 255)
     )
    )
   )
   (return
    (get_local $2)
   )
  )
  (i32.and
   (select
    (i32.const -31)
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
           (get_local $4)
          )
          (i32.const 2)
         )
         (get_local $5)
        )
        (i32.const 136112)
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
    (i32.eq
     (get_local $2)
     (get_local $0)
    )
   )
   (i32.const 255)
  )
 )
 (func $_Z19getBlockThreePointshPct (; 31 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (i32.store offset=216784
   (i32.const 0)
   (i32.const 0)
  )
  (set_local $6
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
    (block $label$2
     (block $label$3
      (br_if $label$3
       (i32.eq
        (tee_local $6
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (get_local $3)
              (tee_local $4
               (i32.mul
                (get_local $0)
                (i32.const 29)
               )
              )
             )
             (i32.const 2)
            )
            (tee_local $5
             (i32.or
              (get_local $6)
              (i32.const 56)
             )
            )
           )
           (i32.const 136112)
          )
         )
        )
        (get_local $0)
       )
      )
      (set_local $2
       (i32.const 255)
      )
      (br_if $label$2
       (i32.eqz
        (i32.and
         (i32.load8_u
          (i32.add
           (get_local $1)
           (get_local $6)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
     (block $label$4
      (br_if $label$4
       (i32.eq
        (tee_local $6
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (tee_local $7
                 (i32.shl
                  (get_local $3)
                  (i32.const 24)
                 )
                )
                (i32.const -16777216)
               )
               (i32.const 24)
              )
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 136112)
          )
         )
        )
        (get_local $0)
       )
      )
      (set_local $2
       (i32.const 254)
      )
      (br_if $label$2
       (i32.eqz
        (i32.and
         (i32.load8_u
          (i32.add
           (get_local $1)
           (get_local $6)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
     (block $label$5
      (br_if $label$5
       (i32.eq
        (tee_local $6
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (get_local $7)
                (i32.const -33554432)
               )
               (i32.const 24)
              )
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 136112)
          )
         )
        )
        (get_local $0)
       )
      )
      (set_local $2
       (i32.const 253)
      )
      (br_if $label$2
       (i32.eqz
        (i32.and
         (i32.load8_u
          (i32.add
           (get_local $1)
           (get_local $6)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
     (block $label$6
      (br_if $label$6
       (i32.eq
        (tee_local $6
         (i32.load8_u
          (i32.add
           (i32.add
            (i32.shl
             (i32.add
              (i32.shr_s
               (i32.add
                (tee_local $7
                 (i32.shl
                  (get_local $3)
                  (i32.const 24)
                 )
                )
                (i32.const -50331648)
               )
               (i32.const 24)
              )
              (get_local $4)
             )
             (i32.const 2)
            )
            (get_local $5)
           )
           (i32.const 136112)
          )
         )
        )
        (get_local $0)
       )
      )
      (set_local $2
       (i32.const 252)
      )
      (br_if $label$2
       (i32.eqz
        (i32.and
         (i32.load8_u
          (i32.add
           (get_local $1)
           (get_local $6)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
     (br_if $label$0
      (i32.eq
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (get_local $7)
               (i32.const -67108864)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 136112)
         )
        )
       )
       (get_local $0)
      )
     )
     (set_local $2
      (i32.const 251)
     )
     (br_if $label$0
      (i32.and
       (i32.load8_u
        (i32.add
         (get_local $1)
         (get_local $6)
        )
       )
       (i32.const 255)
      )
     )
    )
    (loop $label$7
     (block $label$8
      (br_if $label$8
       (i32.eq
        (tee_local $6
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
           (i32.const 136112)
          )
         )
        )
        (get_local $0)
       )
      )
      (br_if $label$8
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (i32.const 255)
       )
      )
      (i32.store8 offset=216784
       (i32.const 0)
       (tee_local $7
        (i32.add
         (i32.load8_u offset=216784
          (i32.const 0)
         )
         (i32.const 1)
        )
       )
      )
      (i32.store8
       (i32.add
        (i32.and
         (get_local $7)
         (i32.const 255)
        )
        (i32.const 216784)
       )
       (get_local $6)
      )
     )
     (br_if $label$7
      (i32.gt_s
       (tee_local $2
        (i32.shr_s
         (i32.add
          (i32.shl
           (get_local $2)
           (i32.const 24)
          )
          (i32.const -16777216)
         )
         (i32.const 24)
        )
       )
       (i32.const -6)
      )
     )
     (br $label$0)
    )
   )
   (block $label$9
    (br_if $label$9
     (i32.eq
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
          (tee_local $6
           (i32.or
            (get_local $6)
            (i32.const 56)
           )
          )
         )
         (i32.const 136112)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$9
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $5)
       )
      )
      (i32.const 255)
     )
    )
    (i32.store8 offset=216785
     (i32.const 0)
     (get_local $5)
    )
    (i32.store8 offset=216784
     (i32.const 0)
     (i32.const 1)
    )
    (set_local $4
     (i32.const 2)
    )
   )
   (block $label$10
    (br_if $label$10
     (i32.eq
      (tee_local $5
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.add
              (tee_local $7
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
          (get_local $6)
         )
         (i32.const 136112)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$10
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $5)
       )
      )
      (i32.const 255)
     )
    )
    (i32.store8 offset=216784
     (i32.const 0)
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $4)
       (i32.const 255)
      )
      (i32.const 216784)
     )
     (get_local $5)
    )
   )
   (block $label$11
    (br_if $label$11
     (i32.eq
      (tee_local $4
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.add
              (get_local $7)
              (i32.const -33554432)
             )
             (i32.const 24)
            )
            (get_local $2)
           )
           (i32.const 2)
          )
          (get_local $6)
         )
         (i32.const 136112)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$11
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $4)
       )
      )
      (i32.const 255)
     )
    )
    (i32.store8 offset=216784
     (i32.const 0)
     (tee_local $5
      (i32.add
       (i32.load8_u offset=216784
        (i32.const 0)
       )
       (i32.const 1)
      )
     )
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $5)
       (i32.const 255)
      )
      (i32.const 216784)
     )
     (get_local $4)
    )
   )
   (block $label$12
    (br_if $label$12
     (i32.eq
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
          (get_local $6)
         )
         (i32.const 136112)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$12
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $4)
       )
      )
      (i32.const 255)
     )
    )
    (i32.store8 offset=216784
     (i32.const 0)
     (tee_local $7
      (i32.add
       (i32.load8_u offset=216784
        (i32.const 0)
       )
       (i32.const 1)
      )
     )
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $7)
       (i32.const 255)
      )
      (i32.const 216784)
     )
     (get_local $4)
    )
   )
   (block $label$13
    (br_if $label$13
     (i32.eq
      (tee_local $4
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
          (get_local $6)
         )
         (i32.const 136112)
        )
       )
      )
      (get_local $0)
     )
    )
    (br_if $label$13
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $4)
       )
      )
      (i32.const 255)
     )
    )
    (i32.store8 offset=216784
     (i32.const 0)
     (tee_local $5
      (i32.add
       (i32.load8_u offset=216784
        (i32.const 0)
       )
       (i32.const 1)
      )
     )
    )
    (i32.store8
     (i32.add
      (i32.and
       (get_local $5)
       (i32.const 255)
      )
      (i32.const 216784)
     )
     (get_local $4)
    )
   )
   (br_if $label$0
    (i32.eq
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
         (get_local $6)
        )
        (i32.const 136112)
       )
      )
     )
     (get_local $0)
    )
   )
   (br_if $label$0
    (i32.and
     (i32.load8_u
      (i32.add
       (get_local $1)
       (get_local $2)
      )
     )
     (i32.const 255)
    )
   )
   (i32.store8 offset=216784
    (i32.const 0)
    (tee_local $6
     (i32.add
      (i32.load8_u offset=216784
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
     (i32.const 216784)
    )
    (get_local $2)
   )
  )
  (i32.load offset=216784
   (i32.const 0)
  )
 )
 (func $_Z16getFreeFourPointhPct (; 32 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (i32.store offset=216784
   (i32.const 0)
   (i32.const 0)
  )
  (block $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.eq
       (tee_local $6
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
             (tee_local $4
              (i32.mul
               (get_local $0)
               (i32.const 29)
              )
             )
            )
            (i32.const 2)
           )
           (tee_local $5
            (i32.or
             (i32.shr_u
              (get_local $2)
              (i32.const 12)
             )
             (i32.const 56)
            )
           )
          )
          (i32.const 136112)
         )
        )
       )
       (get_local $0)
      )
     )
     (set_local $8
      (i32.const 255)
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (block $label$3
     (br_if $label$3
      (i32.eq
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (tee_local $7
                (i32.shl
                 (get_local $3)
                 (i32.const 24)
                )
               )
               (i32.const -16777216)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 136112)
         )
        )
       )
       (get_local $0)
      )
     )
     (set_local $8
      (i32.const 254)
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (block $label$4
     (br_if $label$4
      (i32.eq
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (get_local $7)
               (i32.const -33554432)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 136112)
         )
        )
       )
       (get_local $0)
      )
     )
     (set_local $8
      (i32.const 253)
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (block $label$5
     (br_if $label$5
      (i32.eq
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.add
               (tee_local $7
                (i32.shl
                 (get_local $3)
                 (i32.const 24)
                )
               )
               (i32.const -50331648)
              )
              (i32.const 24)
             )
             (get_local $4)
            )
            (i32.const 2)
           )
           (get_local $5)
          )
          (i32.const 136112)
         )
        )
       )
       (get_local $0)
      )
     )
     (set_local $8
      (i32.const 252)
     )
     (br_if $label$1
      (i32.eqz
       (i32.and
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $6)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (br_if $label$0
     (i32.eq
      (tee_local $6
       (i32.load8_u
        (i32.add
         (i32.add
          (i32.shl
           (i32.add
            (i32.shr_s
             (i32.add
              (get_local $7)
              (i32.const -67108864)
             )
             (i32.const 24)
            )
            (get_local $4)
           )
           (i32.const 2)
          )
          (get_local $5)
         )
         (i32.const 136112)
        )
       )
      )
      (get_local $0)
     )
    )
    (set_local $8
     (i32.const 251)
    )
    (br_if $label$0
     (i32.and
      (i32.load8_u
       (i32.add
        (get_local $1)
        (get_local $6)
       )
      )
      (i32.const 255)
     )
    )
   )
   (loop $label$6
    (block $label$7
     (br_if $label$7
      (i32.eq
       (tee_local $6
        (i32.load8_u
         (i32.add
          (i32.add
           (i32.shl
            (i32.add
             (i32.shr_s
              (i32.shl
               (i32.add
                (get_local $3)
                (get_local $8)
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
          (i32.const 136112)
         )
        )
       )
       (get_local $0)
      )
     )
     (br_if $label$7
      (i32.and
       (i32.load8_u
        (i32.add
         (get_local $1)
         (get_local $6)
        )
       )
       (i32.const 255)
      )
     )
     (i32.store8 offset=216784
      (i32.const 0)
      (tee_local $7
       (i32.add
        (i32.load8_u offset=216784
         (i32.const 0)
        )
        (i32.const 1)
       )
      )
     )
     (i32.store8
      (i32.add
       (i32.and
        (get_local $7)
        (i32.const 255)
       )
       (i32.const 216784)
      )
      (get_local $6)
     )
    )
    (br_if $label$6
     (i32.gt_s
      (tee_local $8
       (i32.shr_s
        (i32.add
         (i32.shl
          (get_local $8)
          (i32.const 24)
         )
         (i32.const -16777216)
        )
        (i32.const 24)
       )
      )
      (i32.const -6)
     )
    )
   )
  )
  (i32.store8 offset=216784
   (i32.const 0)
   (i32.and
    (i32.shr_u
     (get_local $2)
     (i32.const 8)
    )
    (i32.const 7)
   )
  )
  (i32.load offset=216784
   (i32.const 0)
  )
 )
 (func $_Z6isFoulhPc (; 33 ;) (param $0 i32) (param $1 i32) (result i32)
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
  (set_local $6
   (i32.const 1)
  )
  (i32.store8
   (get_local $2)
   (i32.const 1)
  )
  (set_local $7
   (i32.const 0)
  )
  (i32.store8 offset=216355
   (i32.const 0)
   (get_local $0)
  )
  (i32.store8 offset=216354
   (i32.const 0)
   (i32.const 0)
  )
  (i32.store16 offset=216352
   (i32.const 0)
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.eq
     (tee_local $5
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
   (set_local $8
    (i32.const 0)
   )
   (block $label$1
    (br_if $label$1
     (i32.gt_u
      (get_local $5)
      (i32.const 15)
     )
    )
    (block $label$2
     (br_if $label$2
      (i32.le_u
       (get_local $5)
       (i32.const 7)
      )
     )
     (set_local $7
      (i32.const 1)
     )
     (set_local $6
      (i32.const 0)
     )
     (set_local $8
      (i32.const 0)
     )
     (br $label$1)
    )
    (set_local $6
     (i32.const 0)
    )
    (set_local $7
     (i32.const 0)
    )
    (set_local $8
     (i32.const 0)
    )
    (br_if $label$1
     (i32.ne
      (get_local $5)
      (i32.const 7)
     )
    )
    (set_local $6
     (i32.const 0)
    )
    (set_local $8
     (i32.const 1)
    )
    (i32.store16
     (i32.add
      (i32.shl
       (tee_local $5
        (i32.load8_u offset=216353
         (i32.const 0)
        )
       )
       (i32.const 1)
      )
      (i32.const 216356)
     )
     (i32.and
      (get_local $4)
      (i32.const 36863)
     )
    )
    (i32.store8 offset=216353
     (i32.const 0)
     (i32.add
      (get_local $5)
      (i32.const 1)
     )
    )
    (set_local $7
     (i32.const 0)
    )
   )
   (br_if $label$0
    (i32.eq
     (tee_local $5
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
       (get_local $5)
       (i32.const 15)
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
    (block $label$5
     (br_if $label$5
      (i32.le_u
       (get_local $5)
       (i32.const 7)
      )
     )
     (set_local $7
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
     )
     (br $label$3)
    )
    (br_if $label$3
     (i32.ne
      (get_local $5)
      (i32.const 7)
     )
    )
    (i32.store16
     (i32.add
      (i32.shl
       (tee_local $5
        (i32.load8_u offset=216353
         (i32.const 0)
        )
       )
       (i32.const 1)
      )
      (i32.const 216356)
     )
     (i32.or
      (i32.and
       (get_local $4)
       (i32.const 36863)
      )
      (i32.const 4096)
     )
    )
    (i32.store8 offset=216353
     (i32.const 0)
     (i32.add
      (get_local $5)
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.add
      (get_local $8)
      (i32.const 1)
     )
    )
   )
   (br_if $label$0
    (i32.eq
     (tee_local $5
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
       (get_local $5)
       (i32.const 15)
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
    (block $label$8
     (br_if $label$8
      (i32.le_u
       (get_local $5)
       (i32.const 7)
      )
     )
     (set_local $7
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
     )
     (br $label$6)
    )
    (br_if $label$6
     (i32.ne
      (get_local $5)
      (i32.const 7)
     )
    )
    (i32.store16
     (i32.add
      (i32.shl
       (tee_local $5
        (i32.load8_u offset=216353
         (i32.const 0)
        )
       )
       (i32.const 1)
      )
      (i32.const 216356)
     )
     (i32.or
      (i32.and
       (get_local $4)
       (i32.const 36863)
      )
      (i32.const 8192)
     )
    )
    (i32.store8 offset=216353
     (i32.const 0)
     (i32.add
      (get_local $5)
      (i32.const 1)
     )
    )
    (set_local $8
     (i32.add
      (get_local $8)
      (i32.const 1)
     )
    )
   )
   (br_if $label$0
    (i32.eq
     (tee_local $0
      (i32.and
       (tee_local $5
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
       (i32.const 15)
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
       (set_local $7
        (i32.add
         (get_local $7)
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
          (i32.load8_u offset=216353
           (i32.const 0)
          )
         )
         (i32.const 1)
        )
        (i32.const 216356)
       )
       (i32.or
        (i32.and
         (get_local $5)
         (i32.const 36863)
        )
        (i32.const 12288)
       )
      )
      (i32.store8 offset=216353
       (i32.const 0)
       (i32.add
        (get_local $0)
        (i32.const 1)
       )
      )
      (set_local $8
       (i32.add
        (get_local $8)
        (i32.const 1)
       )
      )
     )
     (br_if $label$10
      (i32.and
       (get_local $6)
       (i32.const 255)
      )
     )
     (br_if $label$10
      (i32.gt_s
       (i32.shr_s
        (i32.shl
         (get_local $7)
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
         (get_local $8)
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
     (set_local $5
      (i32.const 0)
     )
     (br $label$9)
    )
    (i32.store8 offset=216352
     (i32.const 0)
     (i32.const 2)
    )
    (br $label$0)
   )
   (loop $label$13
    (set_local $6
     (get_local $5)
    )
    (set_local $7
     (i32.load8_u
      (tee_local $4
       (i32.add
        (tee_local $5
         (i32.mul
          (get_local $0)
          (i32.const 12)
         )
        )
        (i32.const 216352)
       )
      )
     )
    )
    (block $label$14
     (block $label$15
      (block $label$16
       (block $label$17
        (block $label$18
         (block $label$19
          (br_if $label$19
           (i32.and
            (get_local $0)
            (i32.const 1)
           )
          )
          (set_local $0
           (i32.load8_u
            (i32.add
             (i32.or
              (get_local $5)
              (i32.const 3)
             )
             (i32.const 216352)
            )
           )
          )
          (br_if $label$18
           (i32.lt_u
            (get_local $7)
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
          (set_local $5
           (i32.add
            (get_local $6)
            (i32.const -1)
           )
          )
          (br_if $label$14
           (i32.and
            (get_local $6)
            (i32.const 255)
           )
          )
          (i32.store8 offset=216352
           (i32.const 0)
           (i32.const 2)
          )
          (br $label$14)
         )
         (br_if $label$17
          (i32.ne
           (get_local $7)
           (i32.const 1)
          )
         )
         (i32.store8
          (tee_local $0
           (i32.add
            (i32.mul
             (i32.shr_s
              (i32.shl
               (tee_local $5
                (i32.add
                 (get_local $6)
                 (i32.const -1)
                )
               )
               (i32.const 24)
              )
              (i32.const 24)
             )
             (i32.const 12)
            )
            (i32.const 216352)
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
        (br_if $label$16
         (i32.gt_s
          (i32.sub
           (i32.add
            (i32.load8_u
             (i32.add
              (i32.or
               (get_local $5)
               (i32.const 1)
              )
              (i32.const 216352)
             )
            )
            (get_local $7)
           )
           (tee_local $7
            (i32.load8_u
             (tee_local $5
              (i32.add
               (i32.or
                (get_local $5)
                (i32.const 2)
               )
               (i32.const 216352)
              )
             )
            )
           )
          )
          (i32.const 1)
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
              (get_local $6)
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
          (i32.const 216352)
         )
         (i32.const 1)
        )
        (set_local $5
         (get_local $0)
        )
        (br $label$13)
       )
       (br_if $label$15
        (i32.ne
         (tee_local $0
          (i32.load8_u
           (tee_local $7
            (i32.add
             (i32.or
              (get_local $5)
              (i32.const 2)
             )
             (i32.const 216352)
            )
           )
          )
         )
         (i32.load8_u
          (i32.add
           (i32.or
            (get_local $5)
            (i32.const 1)
           )
           (i32.const 216352)
          )
         )
        )
       )
       (set_local $5
        (i32.add
         (get_local $6)
         (i32.const -1)
        )
       )
       (br $label$14)
      )
      (set_local $7
       (call $_Z16getFreeFourPointhPct
        (get_local $0)
        (get_local $1)
        (i32.load16_u
         (i32.add
          (i32.add
           (get_local $4)
           (i32.shl
            (get_local $7)
            (i32.const 1)
           )
          )
          (i32.const 4)
         )
        )
       )
      )
      (i32.store8
       (get_local $5)
       (i32.add
        (i32.load8_u
         (get_local $5)
        )
        (i32.const 1)
       )
      )
      (i32.store8
       (i32.add
        (tee_local $0
         (i32.mul
          (i32.shr_s
           (i32.shl
            (tee_local $5
             (i32.add
              (get_local $6)
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
        (i32.const 216352)
       )
       (i32.const 0)
      )
      (i32.store8
       (i32.add
        (i32.or
         (get_local $0)
         (i32.const 1)
        )
        (i32.const 216352)
       )
       (get_local $7)
      )
      (i32.store8
       (i32.add
        (get_local $0)
        (i32.const 216356)
       )
       (i32.shr_u
        (get_local $7)
        (i32.const 8)
       )
      )
      (i32.store8
       (i32.add
        (get_local $0)
        (i32.const 216357)
       )
       (i32.shr_u
        (get_local $7)
        (i32.const 16)
       )
      )
      (i32.store8
       (i32.add
        (i32.or
         (get_local $0)
         (i32.const 2)
        )
        (i32.const 216352)
       )
       (i32.const 0)
      )
      (br $label$14)
     )
     (i32.store8
      (get_local $7)
      (i32.add
       (get_local $0)
       (i32.const 1)
      )
     )
     (i32.store8
      (tee_local $4
       (i32.add
        (get_local $1)
        (tee_local $7
         (i32.load8_u
          (i32.add
           (i32.add
            (get_local $5)
            (get_local $0)
           )
           (i32.const 216356)
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
           (tee_local $5
            (i32.add
             (get_local $6)
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
       (i32.const 216352)
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
        (i32.const 216352)
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
       (i32.const 216352)
      )
      (i32.const 0)
     )
     (i32.store8
      (i32.add
       (i32.or
        (get_local $0)
        (i32.const 3)
       )
       (i32.const 216352)
      )
      (get_local $7)
     )
     (block $label$20
      (block $label$21
       (br_if $label$21
        (i32.eq
         (tee_local $8
          (i32.and
           (tee_local $10
            (call $_Z13testLineThreehhcPc
             (get_local $7)
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
       (set_local $9
        (i32.add
         (get_local $0)
         (i32.const 216356)
        )
       )
       (block $label$22
        (block $label$23
         (block $label$24
          (br_if $label$24
           (i32.le_u
            (get_local $8)
            (i32.const 15)
           )
          )
          (set_local $8
           (i32.const 0)
          )
          (set_local $13
           (i32.const 1)
          )
          (br $label$23)
         )
         (block $label$25
          (br_if $label$25
           (i32.le_u
            (get_local $8)
            (i32.const 7)
           )
          )
          (set_local $8
           (i32.const 1)
          )
          (set_local $13
           (i32.const 0)
          )
          (br $label$23)
         )
         (set_local $13
          (i32.const 0)
         )
         (block $label$26
          (br_if $label$26
           (i32.ne
            (get_local $8)
            (i32.const 7)
           )
          )
          (set_local $11
           (i32.const 1)
          )
          (i32.store16
           (i32.add
            (get_local $9)
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
            (get_local $10)
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
          (set_local $8
           (i32.const 0)
          )
          (br $label$22)
         )
         (set_local $8
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
           (tee_local $10
            (call $_Z13testLineThreehhcPc
             (get_local $7)
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
           (i32.const 15)
          )
         )
         (set_local $13
          (i32.add
           (get_local $13)
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
         (set_local $8
          (i32.add
           (get_local $8)
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
          (get_local $9)
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
           (get_local $10)
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
           (tee_local $10
            (call $_Z13testLineThreehhcPc
             (get_local $7)
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
           (i32.const 15)
          )
         )
         (set_local $13
          (i32.add
           (get_local $13)
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
         (set_local $8
          (i32.add
           (get_local $8)
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
          (get_local $9)
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
           (get_local $10)
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
           (tee_local $7
            (call $_Z13testLineThreehhcPc
             (get_local $7)
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
         (i32.const 15)
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
         (set_local $8
          (i32.add
           (get_local $8)
           (i32.const 1)
          )
         )
         (br_if $label$33
          (i32.eqz
           (i32.and
            (get_local $13)
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
           (get_local $9)
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
            (get_local $7)
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
          (get_local $13)
          (i32.const 255)
         )
        )
       )
       (br_if $label$21
        (i32.gt_s
         (i32.shr_s
          (i32.shl
           (get_local $8)
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
        (get_local $4)
        (i32.const 0)
       )
       (i32.store8
        (i32.add
         (i32.mul
          (i32.shr_s
           (i32.shl
            (get_local $6)
            (i32.const 24)
           )
           (i32.const 24)
          )
          (i32.const 12)
         )
         (i32.const 216352)
        )
        (i32.const 1)
       )
       (br $label$20)
      )
      (i32.store8
       (get_local $4)
       (i32.const 0)
      )
     )
     (set_local $5
      (get_local $6)
     )
    )
    (br_if $label$13
     (i32.gt_s
      (tee_local $0
       (i32.shr_s
        (i32.shl
         (get_local $5)
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
   (i32.load8_u offset=216352
    (i32.const 0)
   )
   (i32.const 1)
  )
 )
 (func $_Z13testPointFourhcPc (; 34 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (set_local $4
   (i32.load8_u
    (tee_local $3
     (i32.add
      (get_local $2)
      (get_local $0)
     )
    )
   )
  )
  (i32.store8
   (get_local $3)
   (get_local $1)
  )
  (set_local $9
   (i32.const 0)
  )
  (set_local $5
   (call $_Z12testLineFourhhcPc
    (get_local $0)
    (i32.const 0)
    (get_local $1)
    (get_local $2)
   )
  )
  (set_local $6
   (call $_Z12testLineFourhhcPc
    (get_local $0)
    (i32.const 1)
    (get_local $1)
    (get_local $2)
   )
  )
  (set_local $7
   (call $_Z12testLineFourhhcPc
    (get_local $0)
    (i32.const 2)
    (get_local $1)
    (get_local $2)
   )
  )
  (set_local $8
   (call $_Z12testLineFourhhcPc
    (get_local $0)
    (i32.const 3)
    (get_local $1)
    (get_local $2)
   )
  )
  (i32.store8
   (get_local $3)
   (get_local $4)
  )
  (set_local $3
   (select
    (get_local $8)
    (select
     (get_local $7)
     (select
      (get_local $6)
      (select
       (get_local $5)
       (i32.const 0)
       (tee_local $3
        (i32.and
         (get_local $5)
         (i32.const 31)
        )
       )
      )
      (tee_local $4
       (i32.gt_u
        (tee_local $5
         (i32.and
          (get_local $6)
          (i32.const 31)
         )
        )
        (get_local $3)
       )
      )
     )
     (tee_local $5
      (i32.gt_u
       (tee_local $6
        (i32.and
         (get_local $7)
         (i32.const 31)
        )
       )
       (tee_local $3
        (select
         (get_local $5)
         (get_local $3)
         (get_local $4)
        )
       )
      )
     )
    )
    (i32.gt_u
     (i32.and
      (get_local $8)
      (i32.const 31)
     )
     (select
      (get_local $6)
      (get_local $3)
      (get_local $5)
     )
    )
   )
  )
  (block $label$0
   (br_if $label$0
    (i32.ne
     (get_local $1)
     (i32.const 1)
    )
   )
   (br_if $label$0
    (i32.ne
     (i32.and
      (i32.load8_u offset=131104
       (i32.const 0)
      )
      (i32.const 255)
     )
     (i32.const 2)
    )
   )
   (set_local $9
    (i32.shl
     (call $_Z6isFoulhPc
      (get_local $0)
      (get_local $2)
     )
     (i32.const 4)
    )
   )
  )
  (i32.and
   (i32.or
    (get_local $9)
    (get_local $3)
   )
   (i32.const 65535)
  )
 )
 (func $_Z8testFivePccPt (; 35 ;) (param $0 i32) (param $1 i32) (param $2 i32)
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
  (set_local $3
   (call $memset
    (get_local $2)
    (i32.const 0)
    (i32.const 452)
   )
  )
  (set_local $6
   (i32.sub
    (i32.const 15)
    (tee_local $5
     (i32.load8_u offset=131088
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
     (i32.const 216832)
     (i32.const 0)
     (i32.const 452)
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
                 (i32.const 131120)
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
          (i32.const 216800)
         )
         (get_local $18)
        )
        (i32.store8
         (i32.add
          (get_local $2)
          (i32.const 216816)
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
             (i32.load8_u offset=131104
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
                 (i32.const 131115)
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
                 (i32.const 131121)
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
                (i32.const 216800)
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
                 (i32.const 216816)
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
               (i32.const 216800)
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
                (i32.const 216816)
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
               (i32.const 131116)
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
                (i32.const 216800)
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
          (i32.const 216800)
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
 (func $_Z8testFourPccPt (; 36 ;) (param $0 i32) (param $1 i32) (param $2 i32)
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
  (set_local $3
   (call $memset
    (get_local $2)
    (i32.const 0)
    (i32.const 452)
   )
  )
  (set_local $5
   (i32.const 0)
  )
  (loop $label$0
   (set_local $4
    (call $memset
     (i32.const 216832)
     (i32.const 0)
     (i32.const 452)
    )
   )
   (set_local $7
    (i32.and
     (tee_local $18
      (select
       (i32.sub
        (i32.const 15)
        (tee_local $6
         (i32.load8_u offset=131088
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
                 (i32.const 131120)
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
          (i32.const 216800)
         )
         (get_local $17)
        )
        (i32.store8
         (i32.add
          (get_local $2)
          (i32.const 216816)
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
                (i32.load8_u offset=131104
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
                    (i32.const 131115)
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
                    (i32.const 131121)
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
                   (i32.const 216800)
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
                    (i32.const 216816)
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
               (i32.load8_u offset=131104
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
                  (i32.const 131115)
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
                  (i32.const 131121)
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
                 (i32.const 216800)
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
                  (i32.const 216816)
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
                     (i32.const 216800)
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
                  (i32.const 216816)
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
                   (i32.const 216816)
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
               (i32.const 131116)
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
                (i32.const 216800)
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
          (i32.const 216800)
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
           (i32.load8_u offset=131104
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
 (func $_Z9testThreePccPt (; 37 ;) (param $0 i32) (param $1 i32) (param $2 i32)
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
  (local $26 i32)
  (local $27 i32)
  (local $28 i32)
  (set_local $3
   (call $memset
    (get_local $2)
    (i32.const 0)
    (i32.const 452)
   )
  )
  (set_local $5
   (i32.const 0)
  )
  (loop $label$0
   (set_local $4
    (call $memset
     (i32.const 216832)
     (i32.const 0)
     (i32.const 452)
    )
   )
   (set_local $7
    (i32.and
     (tee_local $23
      (select
       (i32.sub
        (i32.const 15)
        (tee_local $6
         (i32.load8_u offset=131088
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
     (set_local $24
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
        (tee_local $21
         (i32.and
          (get_local $23)
          (i32.const 255)
         )
        )
        (get_local $6)
       )
      )
      (set_local $24
       (i32.sub
        (select
         (i32.add
          (get_local $2)
          (i32.const 15)
         )
         (i32.const 29)
         (i32.lt_u
          (get_local $21)
          (i32.const 15)
         )
        )
        (get_local $6)
       )
      )
     )
     (set_local $21
      (i32.and
       (get_local $24)
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
       (set_local $22
        (i32.add
         (get_local $21)
         (get_local $6)
        )
       )
       (br $label$6)
      )
      (block $label$8
       (br_if $label$8
        (i32.ge_s
         (tee_local $22
          (i32.sub
           (get_local $2)
           (get_local $7)
          )
         )
         (get_local $6)
        )
       )
       (set_local $22
        (i32.add
         (i32.add
          (get_local $10)
          (get_local $2)
         )
         (get_local $21)
        )
       )
       (br $label$6)
      )
      (set_local $22
       (i32.add
        (i32.add
         (get_local $21)
         (i32.xor
          (get_local $22)
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
          (get_local $22)
          (i32.const 255)
         )
        )
        (get_local $21)
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
      (set_local $28
       (i32.const 0)
      )
      (set_local $25
       (i32.const 0)
      )
      (set_local $27
       (i32.const 0)
      )
      (set_local $26
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
              (tee_local $22
               (i32.load8_u
                (i32.add
                 (tee_local $14
                  (i32.add
                   (get_local $21)
                   (get_local $13)
                  )
                 )
                 (i32.const 131120)
                )
               )
              )
             )
            )
           )
          )
         )
         (set_local $26
          (select
           (i32.add
            (get_local $26)
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
         (set_local $28
          (select
           (get_local $28)
           (i32.const 0)
           (get_local $2)
          )
         )
         (set_local $27
          (select
           (get_local $27)
           (get_local $25)
           (get_local $2)
          )
         )
         (br $label$11)
        )
        (i32.store8
         (i32.add
          (tee_local $2
           (i32.and
            (get_local $25)
            (i32.const 255)
           )
          )
          (i32.const 216800)
         )
         (get_local $22)
        )
        (i32.store8
         (i32.add
          (get_local $2)
          (i32.const 216816)
         )
         (get_local $24)
        )
        (set_local $25
         (i32.add
          (get_local $25)
          (i32.const 1)
         )
        )
        (set_local $28
         (i32.add
          (get_local $28)
          (i32.const 1)
         )
        )
       )
       (block $label$13
        (br_if $label$13
         (i32.ne
          (i32.add
           (i32.and
            (get_local $28)
            (i32.const 255)
           )
           (tee_local $15
            (i32.and
             (get_local $26)
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
               (get_local $15)
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
                (i32.load8_u offset=131104
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
                    (i32.const 131115)
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
                    (i32.const 131121)
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
                 (get_local $27)
                 (i32.const 255)
                )
               )
               (tee_local $22
                (i32.and
                 (get_local $25)
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
                   (i32.const 216800)
                  )
                 )
                 (i32.const 1)
                )
                (get_local $4)
               )
               (i32.or
                (i32.shl
                 (i32.sub
                  (get_local $21)
                  (i32.load8_u
                   (i32.add
                    (get_local $2)
                    (i32.const 216816)
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
                (get_local $22)
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
               (get_local $26)
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
               (i32.load8_u offset=131104
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
                  (i32.const 131115)
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
                  (i32.const 131121)
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
               (get_local $27)
               (i32.const 255)
              )
              (i32.and
               (get_local $25)
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
               (get_local $27)
               (i32.const 255)
              )
             )
             (tee_local $22
              (i32.and
               (get_local $25)
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
                 (i32.const 216800)
                )
               )
               (i32.const 1)
              )
              (get_local $4)
             )
             (i32.or
              (i32.shl
               (i32.sub
                (get_local $21)
                (i32.load8_u
                 (i32.add
                  (get_local $2)
                  (i32.const 216816)
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
              (get_local $22)
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
             (get_local $27)
             (i32.const 255)
            )
            (i32.and
             (get_local $25)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $18
          (i32.and
           (get_local $25)
           (i32.const 255)
          )
         )
         (set_local $2
          (i32.and
           (get_local $27)
           (i32.const 255)
          )
         )
         (set_local $17
          (i32.shl
           (tee_local $16
            (i32.add
             (get_local $15)
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
               (tee_local $22
                (i32.load16_u
                 (tee_local $19
                  (i32.add
                   (i32.shl
                    (i32.load8_u
                     (i32.add
                      (get_local $2)
                      (i32.const 216800)
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
             (get_local $15)
            )
           )
           (i32.store16
            (get_local $19)
            (tee_local $22
             (i32.or
              (i32.or
               (get_local $17)
               (i32.shl
                (i32.sub
                 (get_local $21)
                 (i32.load8_u
                  (i32.add
                   (get_local $2)
                   (i32.const 216816)
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
               (tee_local $20
                (i32.and
                 (get_local $22)
                 (i32.const 65535)
                )
               )
               (i32.const 1)
              )
              (i32.const 7)
             )
             (get_local $16)
            )
           )
           (block $label$25
            (br_if $label$25
             (i32.eqz
              (i32.and
               (get_local $20)
               (i32.const 32768)
              )
             )
            )
            (i32.store16
             (get_local $19)
             (tee_local $22
              (i32.add
               (get_local $20)
               (i32.const 4096)
              )
             )
            )
           )
           (i32.store16
            (get_local $19)
            (tee_local $20
             (i32.and
              (get_local $22)
              (i32.const 32767)
             )
            )
           )
           (block $label$26
            (br_if $label$26
             (i32.eqz
              (i32.and
               (get_local $22)
               (i32.const 2048)
              )
             )
            )
            (i32.store16
             (get_local $19)
             (tee_local $20
              (i32.or
               (i32.shl
                (i32.sub
                 (get_local $21)
                 (i32.load8_u
                  (i32.add
                   (get_local $2)
                   (i32.const 216816)
                  )
                 )
                )
                (i32.const 5)
               )
               (i32.and
                (i32.add
                 (get_local $20)
                 (i32.const 256)
                )
                (i32.const 65311)
               )
              )
             )
            )
           )
           (i32.store16
            (get_local $19)
            (i32.or
             (get_local $20)
             (i32.const 2048)
            )
           )
          )
          (br_if $label$22
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
        (block $label$27
         (br_if $label$27
          (i32.eqz
           (i32.load8_u
            (i32.add
             (get_local $0)
             (i32.load8_u
              (i32.add
               (get_local $14)
               (i32.const 131116)
              )
             )
            )
           )
          )
         )
         (set_local $26
          (i32.add
           (get_local $26)
           (i32.const -1)
          )
         )
         (br_if $label$13
          (i32.ge_u
           (tee_local $2
            (i32.and
             (get_local $27)
             (i32.const 255)
            )
           )
           (tee_local $22
            (i32.and
             (get_local $25)
             (i32.const 255)
            )
           )
          )
         )
         (loop $label$28
          (i32.store16
           (tee_local $21
            (i32.add
             (i32.shl
              (i32.load8_u
               (i32.add
                (get_local $2)
                (i32.const 216800)
               )
              )
              (i32.const 1)
             )
             (get_local $4)
            )
           )
           (i32.and
            (i32.load16_u
             (get_local $21)
            )
            (i32.const 63487)
           )
          )
          (br_if $label$28
           (i32.ne
            (get_local $22)
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
        (set_local $28
         (i32.add
          (get_local $28)
          (i32.const -1)
         )
        )
        (br_if $label$13
         (i32.ge_u
          (tee_local $2
           (i32.and
            (tee_local $27
             (i32.add
              (get_local $27)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
          )
          (tee_local $19
           (i32.and
            (get_local $25)
            (i32.const 255)
           )
          )
         )
        )
        (set_local $2
         (i32.add
          (get_local $2)
          (i32.const 216800)
         )
        )
        (set_local $21
         (get_local $27)
        )
        (loop $label$29
         (i32.store16
          (tee_local $22
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
            (get_local $22)
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
            (tee_local $21
             (i32.add
              (get_local $21)
              (i32.const 1)
             )
            )
            (i32.const 255)
           )
           (get_local $19)
          )
         )
        )
       )
       (br_if $label$10
        (i32.gt_u
         (get_local $12)
         (tee_local $21
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
     (br_if $label$4
      (i32.gt_u
       (get_local $8)
       (tee_local $2
        (i32.and
         (tee_local $23
          (i32.add
           (get_local $23)
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
   (set_local $26
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
     (loop $label$32
      (block $label$33
       (block $label$34
        (br_if $label$34
         (i32.ne
          (tee_local $19
           (i32.and
            (i32.shr_u
             (tee_local $21
              (i32.load16_u
               (tee_local $28
                (i32.add
                 (tee_local $22
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
          (get_local $22)
         )
         (i32.or
          (i32.and
           (get_local $21)
           (i32.const 36863)
          )
          (get_local $26)
         )
        )
        (br $label$33)
       )
       (br_if $label$33
        (i32.gt_u
         (i32.add
          (get_local $19)
          (i32.const -3)
         )
         (i32.const 1)
        )
       )
       (i32.store16
        (get_local $28)
        (tee_local $21
         (i32.or
          (i32.ne
           (i32.and
            (get_local $21)
            (i32.const 1792)
           )
           (i32.const 0)
          )
          (get_local $21)
         )
        )
       )
       (br_if $label$33
        (i32.le_u
         (i32.and
          (get_local $21)
          (i32.const 31)
         )
         (i32.and
          (i32.load16_u
           (tee_local $22
            (i32.add
             (get_local $3)
             (get_local $22)
            )
           )
          )
          (i32.const 31)
         )
        )
       )
       (block $label$35
        (br_if $label$35
         (i32.ne
          (i32.load8_u offset=131104
           (i32.const 0)
          )
          (i32.const 2)
         )
        )
        (set_local $15
         (call $_Z6isFoulhPc
          (tee_local $21
           (i32.and
            (get_local $2)
            (i32.const 255)
           )
          )
          (get_local $0)
         )
        )
        (block $label$36
         (br_if $label$36
          (i32.ne
           (get_local $19)
           (i32.const 3)
          )
         )
         (br_if $label$36
          (i32.or
           (get_local $15)
           (i32.eqz
            (i32.and
             (i32.load8_u
              (get_local $28)
             )
             (i32.const 1)
            )
           )
          )
         )
         (i32.store8
          (tee_local $20
           (i32.add
            (get_local $0)
            (get_local $2)
           )
          )
          (i32.const 1)
         )
         (i32.store offset=216788
          (i32.const 0)
          (tee_local $19
           (call $_Z16getFreeFourPointhPct
            (get_local $21)
            (get_local $0)
            (i32.and
             (i32.or
              (get_local $26)
              (i32.and
               (i32.load16_u
                (get_local $28)
               )
               (i32.const 36863)
              )
             )
             (i32.const 65535)
            )
           )
          )
         )
         (block $label$37
          (block $label$38
           (br_if $label$38
            (i32.eqz
             (i32.and
              (get_local $19)
              (i32.const 255)
             )
            )
           )
           (set_local $21
            (i32.const 1)
           )
           (block $label$39
            (block $label$40
             (br_if $label$40
              (i32.eqz
               (call $_Z6isFoulhPc
                (i32.and
                 (i32.shr_u
                  (get_local $19)
                  (i32.const 8)
                 )
                 (i32.const 255)
                )
                (get_local $0)
               )
              )
             )
             (set_local $21
              (i32.const 1)
             )
             (loop $label$41
              (br_if $label$39
               (i32.gt_u
                (tee_local $19
                 (i32.and
                  (tee_local $21
                   (i32.add
                    (get_local $21)
                    (i32.const 1)
                   )
                  )
                  (i32.const 255)
                 )
                )
                (tee_local $25
                 (i32.load8_u offset=216788
                  (i32.const 0)
                 )
                )
               )
              )
              (br_if $label$41
               (call $_Z6isFoulhPc
                (i32.load8_u
                 (i32.add
                  (get_local $19)
                  (i32.const 216788)
                 )
                )
                (get_local $0)
               )
              )
             )
            )
            (set_local $25
             (i32.load8_u offset=216788
              (i32.const 0)
             )
            )
           )
           (br_if $label$37
            (i32.le_u
             (i32.and
              (get_local $21)
              (i32.const 255)
             )
             (i32.and
              (get_local $25)
              (i32.const 255)
             )
            )
           )
          )
          (i32.store16
           (get_local $28)
           (i32.and
            (i32.load16_u
             (get_local $28)
            )
            (i32.const 63742)
           )
          )
         )
         (i32.store8
          (get_local $20)
          (i32.const 0)
         )
        )
        (i32.store16
         (get_local $22)
         (i32.or
          (i32.or
           (i32.shl
            (get_local $15)
            (i32.const 4)
           )
           (get_local $26)
          )
          (i32.and
           (i32.load16_u
            (get_local $28)
           )
           (i32.const 36863)
          )
         )
        )
        (br $label$33)
       )
       (i32.store16
        (get_local $22)
        (i32.or
         (i32.and
          (get_local $21)
          (i32.const 36863)
         )
         (get_local $26)
        )
       )
      )
      (br_if $label$32
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
      (br $label$30)
     )
    )
    (set_local $2
     (i32.const 0)
    )
    (loop $label$42
     (block $label$43
      (block $label$44
       (br_if $label$44
        (i32.ne
         (tee_local $22
          (i32.and
           (i32.shr_u
            (tee_local $21
             (i32.load16_u
              (tee_local $19
               (i32.add
                (get_local $2)
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
         (get_local $2)
        )
        (i32.or
         (i32.and
          (get_local $21)
          (i32.const 36863)
         )
         (get_local $26)
        )
       )
       (br $label$43)
      )
      (br_if $label$43
       (i32.gt_u
        (i32.add
         (get_local $22)
         (i32.const -3)
        )
        (i32.const 1)
       )
      )
      (i32.store16
       (get_local $19)
       (tee_local $21
        (i32.or
         (i32.ne
          (i32.and
           (get_local $21)
           (i32.const 1792)
          )
          (i32.const 0)
         )
         (get_local $21)
        )
       )
      )
      (br_if $label$43
       (i32.le_u
        (i32.and
         (get_local $21)
         (i32.const 31)
        )
        (i32.and
         (i32.load16_u
          (tee_local $22
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
       (get_local $22)
       (i32.or
        (i32.and
         (get_local $21)
         (i32.const 36863)
        )
        (get_local $26)
       )
      )
     )
     (br_if $label$42
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
 (func $_Z8getLevelPcc (; 38 ;) (param $0 i32) (param $1 i32) (result i32)
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
    (i32.const 217296)
    (i32.const 0)
    (i32.const 452)
   )
  )
  (set_local $5
   (i32.add
    (tee_local $3
     (i32.load8_u offset=131088
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
     (i32.const 216832)
     (i32.const 0)
     (i32.const 452)
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
                 (i32.const 131120)
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
          (i32.const 216800)
         )
         (get_local $18)
        )
        (i32.store8
         (i32.add
          (get_local $22)
          (i32.const 216816)
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
              (i32.load8_u offset=131104
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
                 (i32.const 131115)
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
                 (i32.const 131121)
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
              (i32.load8_u offset=131104
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
                 (i32.const 131115)
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
                 (i32.const 131121)
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
               (i32.const 216800)
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
                (i32.const 216816)
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
               (i32.const 131116)
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
           (i32.const 217282)
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
       (i32.const 217746)
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
   (block $label$24
    (block $label$25
     (br_if $label$25
      (i32.and
       (get_local $14)
       (i32.const 1)
      )
     )
     (set_local $13
      (i32.const 0)
     )
     (set_local $22
      (i32.const 217296)
     )
     (set_local $24
      (i32.const 255)
     )
     (loop $label$26
      (block $label$27
       (br_if $label$27
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
       (block $label$28
        (br_if $label$28
         (i32.eq
          (tee_local $23
           (i32.and
            (get_local $24)
            (i32.const 255)
           )
          )
          (i32.const 255)
         )
        )
        (br_if $label$27
         (i32.eq
          (get_local $13)
          (get_local $23)
         )
        )
        (br $label$23)
       )
       (set_local $24
        (get_local $13)
       )
      )
      (set_local $22
       (i32.add
        (get_local $22)
        (i32.const 2)
       )
      )
      (br_if $label$26
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
     (br_if $label$24
      (i32.eq
       (tee_local $22
        (i32.and
         (get_local $24)
         (i32.const 255)
        )
       )
       (i32.const 255)
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
         (i32.load8_u offset=131104
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
          (get_local $24)
          (i32.const 255)
         )
         (get_local $0)
        )
       )
      )
      (return
       (i32.or
        (i32.shl
         (get_local $22)
         (i32.const 8)
        )
        (i32.const 9)
       )
      )
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
    )
    (return
     (get_local $22)
    )
   )
   (return
    (i32.const 0)
   )
  )
  (i32.or
   (i32.shl
    (get_local $23)
    (i32.const 8)
   )
   (i32.const 9)
  )
 )
 (func $_Z11isChildMovePhhS_h (; 39 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $6
   (i32.const 1)
  )
  (block $label$0
   (br_if $label$0
    (i32.lt_u
     (get_local $1)
     (i32.const 2)
    )
   )
   (br_if $label$0
    (i32.lt_u
     (get_local $3)
     (i32.const 2)
    )
   )
   (set_local $6
    (i32.const 1)
   )
   (loop $label$1
    (set_local $4
     (i32.load8_u
      (i32.add
       (get_local $0)
       (get_local $6)
      )
     )
    )
    (set_local $5
     (i32.const 1)
    )
    (block $label$2
     (loop $label$3
      (br_if $label$2
       (i32.eq
        (i32.load8_u
         (i32.add
          (get_local $2)
          (get_local $5)
         )
        )
        (i32.and
         (get_local $4)
         (i32.const 255)
        )
       )
      )
      (br_if $label$3
       (i32.lt_u
        (tee_local $5
         (i32.and
          (i32.add
           (get_local $5)
           (i32.const 2)
          )
          (i32.const 255)
         )
        )
        (get_local $3)
       )
      )
      (br $label$0)
     )
    )
    (br_if $label$1
     (i32.lt_u
      (tee_local $6
       (i32.and
        (i32.add
         (get_local $6)
         (i32.const 2)
        )
        (i32.const 255)
       )
      )
      (get_local $1)
     )
    )
   )
  )
  (i32.ge_u
   (get_local $6)
   (get_local $1)
  )
 )
 (func $_Z12isRepeatMovePhS_h (; 40 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (set_local $5
   (i32.const 1)
  )
  (block $label$0
   (br_if $label$0
    (i32.lt_u
     (get_local $2)
     (i32.const 2)
    )
   )
   (set_local $5
    (i32.const 1)
   )
   (loop $label$1
    (set_local $3
     (i32.load8_u
      (i32.add
       (get_local $0)
       (get_local $5)
      )
     )
    )
    (set_local $4
     (i32.const 1)
    )
    (block $label$2
     (loop $label$3
      (br_if $label$2
       (i32.eq
        (i32.load8_u
         (i32.add
          (get_local $1)
          (get_local $4)
         )
        )
        (i32.and
         (get_local $3)
         (i32.const 255)
        )
       )
      )
      (br_if $label$3
       (i32.lt_u
        (tee_local $4
         (i32.and
          (i32.add
           (get_local $4)
           (i32.const 2)
          )
          (i32.const 255)
         )
        )
        (get_local $2)
       )
      )
      (br $label$0)
     )
    )
    (br_if $label$1
     (i32.lt_u
      (tee_local $5
       (i32.and
        (i32.add
         (get_local $5)
         (i32.const 2)
        )
        (i32.const 255)
       )
      )
      (get_local $2)
     )
    )
   )
  )
  (i32.ge_u
   (get_local $5)
   (get_local $2)
  )
 )
 (func $_Z21setVCFHashMaxMovesLenh (; 41 ;) (param $0 i32)
  (i32.store8 offset=128632384
   (i32.const 0)
   (i32.add
    (get_local $0)
    (i32.const 1)
   )
  )
 )
 (func $_Z8resetVCFv (; 42 ;)
  (i32.store offset=128632372
   (i32.const 0)
   (i32.const 5880420)
  )
  (drop
   (call $memset
    (i32.const 351696)
    (i32.const 0)
    (i32.const 5880420)
   )
  )
 )
 (func $_Z15vcfPositionPushhjPc (; 43 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (set_local $4
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $3
      (i32.load offset=128632372
       (i32.const 0)
      )
     )
     (i32.const 128280419)
    )
   )
   (set_local $4
    (i32.shl
     (i32.add
      (i32.mul
       (i32.shr_u
        (get_local $0)
        (i32.const 1)
       )
       (i32.const 16155)
      )
      (get_local $1)
     )
     (i32.const 2)
    )
   )
   (loop $label$1
    (set_local $4
     (i32.add
      (tee_local $0
       (i32.load
        (i32.add
         (tee_local $1
          (get_local $4)
         )
         (i32.const 351696)
        )
       )
      )
      (i32.const 228)
     )
    )
    (br_if $label$1
     (get_local $0)
    )
   )
   (i32.store
    (i32.add
     (get_local $1)
     (i32.const 351696)
    )
    (get_local $3)
   )
   (set_local $0
    (i32.add
     (get_local $3)
     (i32.const 351696)
    )
   )
   (set_local $4
    (i32.const 0)
   )
   (loop $label$2
    (i32.store8
     (i32.add
      (get_local $0)
      (get_local $4)
     )
     (i32.load8_u
      (i32.add
       (get_local $2)
       (get_local $4)
      )
     )
    )
    (br_if $label$2
     (i32.ne
      (tee_local $4
       (i32.add
        (get_local $4)
        (i32.const 1)
       )
      )
      (i32.const 225)
     )
    )
   )
   (i32.store offset=128632372
    (i32.const 0)
    (tee_local $4
     (i32.add
      (get_local $3)
      (i32.const 232)
     )
    )
   )
   (i32.store
    (i32.add
     (get_local $3)
     (i32.const 351924)
    )
    (i32.const 0)
   )
  )
  (get_local $4)
 )
 (func $_Z14vcfPositionHashjPc (; 44 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.eqz
      (tee_local $3
       (i32.load
        (i32.add
         (i32.shl
          (i32.add
           (i32.mul
            (i32.shr_u
             (get_local $0)
             (i32.const 1)
            )
            (i32.const 16155)
           )
           (get_local $1)
          )
          (i32.const 2)
         )
         (i32.const 351696)
        )
       )
      )
     )
    )
    (loop $label$2
     (set_local $1
      (i32.add
       (get_local $3)
       (i32.const 351696)
      )
     )
     (set_local $4
      (i32.const 0)
     )
     (set_local $0
      (get_local $2)
     )
     (block $label$3
      (loop $label$4
       (br_if $label$3
        (i32.ne
         (i32.load8_u
          (get_local $1)
         )
         (i32.load8_u
          (get_local $0)
         )
        )
       )
       (set_local $5
        (i32.const 1)
       )
       (set_local $0
        (i32.add
         (get_local $0)
         (i32.const 1)
        )
       )
       (set_local $1
        (i32.add
         (get_local $1)
         (i32.const 1)
        )
       )
       (br_if $label$4
        (i32.le_u
         (i32.and
          (tee_local $4
           (i32.add
            (get_local $4)
            (i32.const 1)
           )
          )
          (i32.const 255)
         )
         (i32.const 224)
        )
       )
       (br $label$0)
      )
     )
     (br_if $label$2
      (tee_local $3
       (i32.load
        (i32.add
         (get_local $3)
         (i32.const 351924)
        )
       )
      )
     )
    )
   )
   (set_local $5
    (i32.const 0)
   )
  )
  (get_local $5)
 )
 (func $_Z12vcfMovesPushhjPh (; 45 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $6
   (i32.const 0)
  )
  (block $label$0
   (br_if $label$0
    (i32.gt_u
     (tee_local $3
      (i32.load offset=128632372
       (i32.const 0)
      )
     )
     (i32.const 128280419)
    )
   )
   (set_local $4
    (i32.and
     (i32.add
      (get_local $0)
      (i32.const 4)
     )
     (i32.const 252)
    )
   )
   (set_local $6
    (i32.shl
     (i32.add
      (i32.mul
       (i32.shr_u
        (get_local $0)
        (i32.const 1)
       )
       (i32.const 16155)
      )
      (get_local $1)
     )
     (i32.const 2)
    )
   )
   (loop $label$1
    (set_local $6
     (i32.add
      (tee_local $1
       (i32.load
        (i32.add
         (tee_local $5
          (get_local $6)
         )
         (i32.const 351696)
        )
       )
      )
      (get_local $4)
     )
    )
    (br_if $label$1
     (get_local $1)
    )
   )
   (i32.store
    (i32.add
     (get_local $5)
     (i32.const 351696)
    )
    (get_local $3)
   )
   (i32.store8
    (i32.add
     (get_local $3)
     (i32.const 351696)
    )
    (get_local $0)
   )
   (block $label$2
    (br_if $label$2
     (i32.eqz
      (get_local $0)
     )
    )
    (set_local $6
     (i32.add
      (get_local $3)
      (i32.const 351697)
     )
    )
    (loop $label$3
     (i32.store8
      (get_local $6)
      (i32.load8_u
       (get_local $2)
      )
     )
     (set_local $2
      (i32.add
       (get_local $2)
       (i32.const 1)
      )
     )
     (set_local $6
      (i32.add
       (get_local $6)
       (i32.const 1)
      )
     )
     (br_if $label$3
      (tee_local $0
       (i32.add
        (get_local $0)
        (i32.const -1)
       )
      )
     )
    )
   )
   (i32.store offset=128632372
    (i32.const 0)
    (tee_local $6
     (i32.add
      (tee_local $1
       (i32.add
        (get_local $3)
        (get_local $4)
       )
      )
      (i32.const 4)
     )
    )
   )
   (i32.store
    (i32.add
     (get_local $1)
     (i32.const 351696)
    )
    (i32.const 0)
   )
  )
  (get_local $6)
 )
 (func $_Z11vcfMovesHashjPh (; 46 ;) (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (set_local $5
   (i32.const 1)
  )
  (block $label$0
   (block $label$1
    (block $label$2
     (br_if $label$2
      (i32.eqz
       (tee_local $6
        (i32.load
         (i32.add
          (i32.shl
           (i32.add
            (i32.mul
             (i32.shr_u
              (get_local $0)
              (i32.const 1)
             )
             (i32.const 16155)
            )
            (get_local $1)
           )
           (i32.const 2)
          )
          (i32.const 351696)
         )
        )
       )
      )
     )
     (br_if $label$0
      (i32.lt_u
       (get_local $0)
       (i32.const 2)
      )
     )
     (set_local $3
      (i32.and
       (i32.add
        (get_local $0)
        (i32.const 4)
       )
       (i32.const 252)
      )
     )
     (loop $label$3
      (set_local $4
       (i32.add
        (get_local $6)
        (i32.const 351697)
       )
      )
      (set_local $7
       (i32.const 1)
      )
      (loop $label$4
       (set_local $5
        (i32.load8_u
         (i32.add
          (get_local $2)
          (get_local $7)
         )
        )
       )
       (set_local $1
        (i32.const 1)
       )
       (block $label$5
        (block $label$6
         (loop $label$7
          (br_if $label$6
           (i32.eq
            (i32.load8_u
             (i32.add
              (get_local $4)
              (get_local $1)
             )
            )
            (i32.and
             (get_local $5)
             (i32.const 255)
            )
           )
          )
          (br_if $label$7
           (i32.lt_u
            (tee_local $1
             (i32.and
              (i32.add
               (get_local $1)
               (i32.const 2)
              )
              (i32.const 255)
             )
            )
            (get_local $0)
           )
          )
          (br $label$5)
         )
        )
        (br_if $label$4
         (i32.lt_u
          (tee_local $7
           (i32.and
            (i32.add
             (get_local $7)
             (i32.const 2)
            )
            (i32.const 255)
           )
          )
          (get_local $0)
         )
        )
       )
      )
      (br_if $label$1
       (i32.ge_u
        (get_local $7)
        (get_local $0)
       )
      )
      (br_if $label$3
       (tee_local $6
        (i32.load
         (i32.add
          (i32.add
           (get_local $6)
           (get_local $3)
          )
          (i32.const 351696)
         )
        )
       )
      )
     )
     (return
      (i32.const 0)
     )
    )
    (return
     (i32.const 0)
    )
   )
   (set_local $5
    (i32.const 1)
   )
  )
  (get_local $5)
 )
 (func $_Z17vcfTransTablePushhjPhPc (; 47 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (set_local $4
   (i32.load offset=128632372
    (i32.const 0)
   )
  )
  (block $label$0
   (block $label$1
    (br_if $label$1
     (i32.le_u
      (i32.load8_u offset=128632384
       (i32.const 0)
      )
      (get_local $0)
     )
    )
    (br_if $label$0
     (i32.gt_u
      (get_local $4)
      (i32.const 128280419)
     )
    )
    (set_local $3
     (i32.and
      (i32.add
       (get_local $0)
       (i32.const 4)
      )
      (i32.const 252)
     )
    )
    (set_local $1
     (i32.shl
      (i32.add
       (i32.mul
        (i32.shr_u
         (get_local $0)
         (i32.const 1)
        )
        (i32.const 16155)
       )
       (get_local $1)
      )
      (i32.const 2)
     )
    )
    (loop $label$2
     (set_local $1
      (i32.add
       (tee_local $6
        (i32.load
         (i32.add
          (tee_local $5
           (get_local $1)
          )
          (i32.const 351696)
         )
        )
       )
       (get_local $3)
      )
     )
     (br_if $label$2
      (get_local $6)
     )
    )
    (i32.store
     (i32.add
      (get_local $5)
      (i32.const 351696)
     )
     (get_local $4)
    )
    (i32.store8
     (i32.add
      (get_local $4)
      (i32.const 351696)
     )
     (get_local $0)
    )
    (block $label$3
     (br_if $label$3
      (i32.eqz
       (get_local $0)
      )
     )
     (set_local $1
      (i32.add
       (get_local $4)
       (i32.const 351697)
      )
     )
     (loop $label$4
      (i32.store8
       (get_local $1)
       (i32.load8_u
        (get_local $2)
       )
      )
      (set_local $2
       (i32.add
        (get_local $2)
        (i32.const 1)
       )
      )
      (set_local $1
       (i32.add
        (get_local $1)
        (i32.const 1)
       )
      )
      (br_if $label$4
       (tee_local $0
        (i32.add
         (get_local $0)
         (i32.const -1)
        )
       )
      )
     )
    )
    (i32.store offset=128632372
     (i32.const 0)
     (i32.add
      (tee_local $1
       (i32.add
        (get_local $4)
        (get_local $3)
       )
      )
      (i32.const 4)
     )
    )
    (i32.store
     (i32.add
      (get_local $1)
      (i32.const 351696)
     )
     (i32.const 0)
    )
    (return)
   )
   (br_if $label$0
    (i32.gt_u
     (get_local $4)
     (i32.const 128280419)
    )
   )
   (set_local $1
    (i32.shl
     (i32.add
      (i32.mul
       (i32.shr_u
        (get_local $0)
        (i32.const 1)
       )
       (i32.const 16155)
      )
      (get_local $1)
     )
     (i32.const 2)
    )
   )
   (loop $label$5
    (set_local $1
     (i32.add
      (tee_local $6
       (i32.load
        (i32.add
         (tee_local $2
          (get_local $1)
         )
         (i32.const 351696)
        )
       )
      )
      (i32.const 228)
     )
    )
    (br_if $label$5
     (get_local $6)
    )
   )
   (i32.store
    (i32.add
     (get_local $2)
     (i32.const 351696)
    )
    (get_local $4)
   )
   (set_local $6
    (i32.add
     (get_local $4)
     (i32.const 351696)
    )
   )
   (set_local $1
    (i32.const 0)
   )
   (loop $label$6
    (i32.store8
     (i32.add
      (get_local $6)
      (get_local $1)
     )
     (i32.load8_u
      (i32.add
       (get_local $3)
       (get_local $1)
      )
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
      (i32.const 225)
     )
    )
   )
   (i32.store offset=128632372
    (i32.const 0)
    (i32.add
     (get_local $4)
     (i32.const 232)
    )
   )
   (i32.store
    (i32.add
     (get_local $4)
     (i32.const 351924)
    )
    (i32.const 0)
   )
  )
 )
 (func $_Z16vcfTransTableHashjPhPc (; 48 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (block $label$0
   (block $label$1
    (block $label$2
     (block $label$3
      (block $label$4
       (br_if $label$4
        (i32.le_u
         (i32.load8_u offset=128632384
          (i32.const 0)
         )
         (get_local $0)
        )
       )
       (set_local $7
        (i32.const 1)
       )
       (br_if $label$1
        (i32.eqz
         (tee_local $6
          (i32.load
           (i32.add
            (i32.shl
             (i32.add
              (i32.mul
               (i32.shr_u
                (get_local $0)
                (i32.const 1)
               )
               (i32.const 16155)
              )
              (get_local $1)
             )
             (i32.const 2)
            )
            (i32.const 351696)
           )
          )
         )
        )
       )
       (br_if $label$3
        (i32.lt_u
         (get_local $0)
         (i32.const 2)
        )
       )
       (set_local $4
        (i32.and
         (i32.add
          (get_local $0)
          (i32.const 4)
         )
         (i32.const 252)
        )
       )
       (loop $label$5
        (set_local $5
         (i32.add
          (get_local $6)
          (i32.const 351697)
         )
        )
        (set_local $7
         (i32.const 1)
        )
        (loop $label$6
         (set_local $3
          (i32.load8_u
           (i32.add
            (get_local $2)
            (get_local $7)
           )
          )
         )
         (set_local $1
          (i32.const 1)
         )
         (block $label$7
          (block $label$8
           (loop $label$9
            (br_if $label$8
             (i32.eq
              (i32.load8_u
               (i32.add
                (get_local $5)
                (get_local $1)
               )
              )
              (i32.and
               (get_local $3)
               (i32.const 255)
              )
             )
            )
            (br_if $label$9
             (i32.lt_u
              (tee_local $1
               (i32.and
                (i32.add
                 (get_local $1)
                 (i32.const 2)
                )
                (i32.const 255)
               )
              )
              (get_local $0)
             )
            )
            (br $label$7)
           )
          )
          (br_if $label$6
           (i32.lt_u
            (tee_local $7
             (i32.and
              (i32.add
               (get_local $7)
               (i32.const 2)
              )
              (i32.const 255)
             )
            )
            (get_local $0)
           )
          )
         )
        )
        (br_if $label$0
         (i32.ge_u
          (get_local $7)
          (get_local $0)
         )
        )
        (br_if $label$5
         (tee_local $6
          (i32.load
           (i32.add
            (i32.add
             (get_local $6)
             (get_local $4)
            )
            (i32.const 351696)
           )
          )
         )
        )
       )
       (return
        (i32.const 0)
       )
      )
      (set_local $7
       (i32.const 0)
      )
      (br_if $label$3
       (i32.eqz
        (tee_local $5
         (i32.load
          (i32.add
           (i32.shl
            (i32.add
             (i32.mul
              (i32.shr_u
               (get_local $0)
               (i32.const 1)
              )
              (i32.const 16155)
             )
             (get_local $1)
            )
            (i32.const 2)
           )
           (i32.const 351696)
          )
         )
        )
       )
      )
      (loop $label$10
       (set_local $0
        (i32.add
         (get_local $5)
         (i32.const 351696)
        )
       )
       (set_local $1
        (i32.const 0)
       )
       (block $label$11
        (loop $label$12
         (br_if $label$11
          (i32.ne
           (i32.load8_u
            (i32.add
             (get_local $0)
             (get_local $1)
            )
           )
           (i32.load8_u
            (i32.add
             (get_local $3)
             (get_local $1)
            )
           )
          )
         )
         (br_if $label$12
          (i32.le_u
           (tee_local $1
            (i32.add
             (get_local $1)
             (i32.const 1)
            )
           )
           (i32.const 224)
          )
         )
         (br $label$2)
        )
       )
       (set_local $7
        (i32.const 0)
       )
       (br_if $label$10
        (tee_local $5
         (i32.load
          (i32.add
           (get_local $5)
           (i32.const 351924)
          )
         )
        )
       )
      )
     )
     (return
      (get_local $7)
     )
    )
    (return
     (i32.const 1)
    )
   )
   (return
    (i32.const 0)
   )
  )
  (i32.const 1)
 )
 (func $_Z5isVCFcPcPhh (; 49 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (block $label$0
   (block $label$1
    (block $label$2
     (block $label$3
      (block $label$4
       (br_if $label$4
        (i32.eqz
         (get_local $3)
        )
       )
       (set_local $4
        (i32.load8_u
         (i32.add
          (get_local $0)
          (i32.const 128632400)
         )
        )
       )
       (set_local $8
        (i32.const 0)
       )
       (set_local $11
        (i32.const 0)
       )
       (block $label$5
        (loop $label$6
         (block $label$7
          (block $label$8
           (br_if $label$8
            (i32.gt_u
             (tee_local $5
              (i32.and
               (tee_local $9
                (call $_Z8getLevelPcc
                 (get_local $1)
                 (i32.shr_s
                  (i32.shl
                   (get_local $4)
                   (i32.const 24)
                  )
                  (i32.const 24)
                 )
                )
               )
               (i32.const 255)
              )
             )
             (i32.const 7)
            )
           )
           (br_if $label$7
            (i32.eqz
             (i32.load8_u
              (i32.add
               (get_local $1)
               (tee_local $9
                (i32.load8_u
                 (tee_local $5
                  (i32.add
                   (get_local $2)
                   (get_local $8)
                  )
                 )
                )
               )
              )
             )
            )
           )
           (br $label$5)
          )
          (br_if $label$5
           (i32.ne
            (get_local $5)
            (i32.const 8)
           )
          )
          (br_if $label$5
           (i32.ne
            (i32.shr_u
             (get_local $9)
             (i32.const 8)
            )
            (tee_local $9
             (i32.load8_u
              (tee_local $5
               (i32.add
                (get_local $2)
                (get_local $8)
               )
              )
             )
            )
           )
          )
         )
         (br_if $label$5
          (i32.ne
           (i32.and
            (tee_local $9
             (call $_Z13testPointFourhcPc
              (get_local $9)
              (get_local $0)
              (get_local $1)
             )
            )
            (i32.const 30)
           )
           (i32.const 8)
          )
         )
         (i32.store8
          (i32.add
           (i32.and
            (get_local $11)
            (i32.const 255)
           )
           (i32.const 350976)
          )
          (i32.load8_u
           (get_local $5)
          )
         )
         (i32.store8
          (i32.add
           (get_local $1)
           (i32.load8_u
            (get_local $5)
           )
          )
          (get_local $0)
         )
         (set_local $6
          (i32.or
           (get_local $11)
           (i32.const 1)
          )
         )
         (br_if $label$3
          (i32.ge_u
           (tee_local $7
            (i32.add
             (get_local $8)
             (i32.const 1)
            )
           )
           (get_local $3)
          )
         )
         (set_local $10
          (i32.const 0)
         )
         (br_if $label$2
          (i32.ne
           (tee_local $5
            (call $_Z17getBlockFourPointhPct
             (i32.load8_u
              (get_local $5)
             )
             (get_local $1)
             (get_local $9)
            )
           )
           (i32.load8_u
            (i32.add
             (get_local $2)
             (get_local $7)
            )
           )
          )
         )
         (br_if $label$2
          (i32.load8_u
           (tee_local $9
            (i32.add
             (get_local $1)
             (get_local $5)
            )
           )
          )
         )
         (i32.store8
          (i32.add
           (i32.and
            (get_local $6)
            (i32.const 255)
           )
           (i32.const 350976)
          )
          (get_local $5)
         )
         (i32.store8
          (get_local $9)
          (get_local $4)
         )
         (set_local $11
          (i32.add
           (get_local $11)
           (i32.const 2)
          )
         )
         (br_if $label$6
          (i32.lt_u
           (tee_local $8
            (i32.and
             (i32.add
              (get_local $8)
              (i32.const 2)
             )
             (i32.const 255)
            )
           )
           (get_local $3)
          )
         )
        )
       )
       (set_local $10
        (i32.const 0)
       )
       (br_if $label$1
        (i32.and
         (get_local $11)
         (i32.const 255)
        )
       )
       (br $label$0)
      )
      (return
       (i32.const 0)
      )
     )
     (set_local $10
      (i32.eq
       (i32.and
        (call $_Z8getLevelPcc
         (get_local $1)
         (get_local $0)
        )
        (i32.const 255)
       )
       (i32.const 9)
      )
     )
    )
    (set_local $11
     (get_local $6)
    )
   )
   (set_local $8
    (i32.and
     (get_local $11)
     (i32.const 255)
    )
   )
   (set_local $11
    (i32.const 0)
   )
   (loop $label$9
    (i32.store8
     (i32.add
      (get_local $1)
      (i32.load8_u
       (i32.add
        (get_local $11)
        (i32.const 350976)
       )
      )
     )
     (i32.const 0)
    )
    (br_if $label$9
     (i32.ne
      (get_local $8)
      (tee_local $11
       (i32.add
        (get_local $11)
        (i32.const 1)
       )
      )
     )
    )
   )
  )
  (get_local $10)
 )
 (func $_Z9simpleVCFcPcPhRh (; 50 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  (local $12 i32)
  (block $label$0
   (br_if $label$0
    (i32.eqz
     (tee_local $9
      (i32.and
       (i32.add
        (i32.load8_u
         (get_local $3)
        )
        (i32.const -6)
       )
       (i32.const 255)
      )
     )
    )
   )
   (set_local $7
    (i32.const 0)
   )
   (set_local $6
    (i32.shr_s
     (i32.shl
      (i32.load8_u
       (i32.add
        (get_local $0)
        (i32.const 128632400)
       )
      )
      (i32.const 24)
     )
     (i32.const 24)
    )
   )
   (set_local $12
    (i32.const 1)
   )
   (set_local $11
    (i32.const 1)
   )
   (loop $label$1
    (block $label$2
     (br_if $label$2
      (i32.ne
       (i32.and
        (call $_Z13testPointFourhcPc
         (i32.load8_u
          (i32.add
           (get_local $2)
           (get_local $12)
          )
         )
         (get_local $6)
         (get_local $1)
        )
        (i32.const 30)
       )
       (i32.const 8)
      )
     )
     (i32.store8
      (i32.add
       (i32.and
        (get_local $7)
        (i32.const 255)
       )
       (i32.const 351216)
      )
      (get_local $11)
     )
     (set_local $7
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
     )
    )
    (br_if $label$1
     (i32.ge_u
      (get_local $9)
      (tee_local $12
       (i32.and
        (tee_local $11
         (i32.add
          (get_local $12)
          (i32.const 2)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
   )
   (br_if $label$0
    (i32.eqz
     (i32.and
      (get_local $7)
      (i32.const 255)
     )
    )
   )
   (loop $label$3
    (set_local $10
     (i32.add
      (tee_local $9
       (i32.load8_u
        (i32.add
         (tee_local $12
          (i32.and
           (i32.add
            (get_local $7)
            (i32.const -1)
           )
           (i32.const 255)
          )
         )
         (i32.const 351216)
        )
       )
      )
      (i32.const 255)
     )
    )
    (block $label$4
     (block $label$5
      (br_if $label$5
       (i32.eqz
        (i32.and
         (tee_local $7
          (i32.add
           (tee_local $4
            (i32.and
             (get_local $7)
             (i32.const 255)
            )
           )
           (i32.const 255)
          )
         )
         (i32.const 255)
        )
       )
      )
      (set_local $8
       (i32.const 2)
      )
      (set_local $6
       (i32.const 4)
      )
      (loop $label$6
       (set_local $11
        (get_local $6)
       )
       (br_if $label$4
        (i32.ge_s
         (i32.sub
          (get_local $9)
          (i32.load8_u
           (i32.add
            (get_local $12)
            (i32.const 351215)
           )
          )
         )
         (i32.const 3)
        )
       )
       (set_local $6
        (i32.add
         (i32.and
          (get_local $11)
          (i32.const 255)
         )
         (i32.const 2)
        )
       )
       (set_local $10
        (i32.add
         (tee_local $9
          (i32.load8_u
           (i32.add
            (tee_local $12
             (i32.and
              (tee_local $7
               (i32.add
                (get_local $7)
                (i32.const -1)
               )
              )
              (i32.const 255)
             )
            )
            (i32.const 351216)
           )
          )
         )
         (i32.const 255)
        )
       )
       (set_local $8
        (get_local $11)
       )
       (br_if $label$6
        (get_local $12)
       )
       (br $label$4)
      )
     )
     (set_local $8
      (i32.const 2)
     )
    )
    (set_local $7
     (i32.add
      (i32.and
       (tee_local $6
        (i32.add
         (get_local $8)
         (i32.const 2)
        )
       )
       (i32.const 255)
      )
      (i32.const 510)
     )
    )
    (block $label$7
     (block $label$8
      (br_if $label$8
       (i32.eqz
        (tee_local $11
         (i32.and
          (i32.add
           (get_local $9)
           (i32.const -1)
          )
          (i32.const 255)
         )
        )
       )
      )
      (set_local $9
       (i32.and
        (i32.add
         (get_local $9)
         (i32.const -2)
        )
        (i32.const 255)
       )
      )
      (set_local $12
       (i32.const 0)
      )
      (loop $label$9
       (i32.store8
        (i32.add
         (get_local $12)
         (i32.const 351456)
        )
        (i32.load8_u
         (i32.add
          (get_local $2)
          (get_local $12)
         )
        )
       )
       (br_if $label$9
        (i32.ne
         (get_local $11)
         (tee_local $12
          (i32.add
           (get_local $12)
           (i32.const 1)
          )
         )
        )
       )
      )
      (set_local $12
       (i32.add
        (get_local $9)
        (i32.const 1)
       )
      )
      (br $label$7)
     )
     (set_local $11
      (i32.const 0)
     )
     (set_local $12
      (i32.const 0)
     )
    )
    (set_local $9
     (i32.shr_u
      (get_local $7)
      (i32.const 1)
     )
    )
    (block $label$10
     (br_if $label$10
      (i32.le_u
       (i32.load8_u
        (get_local $3)
       )
       (tee_local $5
        (i32.and
         (tee_local $8
          (i32.add
           (get_local $6)
           (get_local $11)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
     (set_local $11
      (get_local $8)
     )
     (loop $label$11
      (i32.store8
       (i32.add
        (i32.and
         (get_local $12)
         (i32.const 255)
        )
        (i32.const 351456)
       )
       (i32.load8_u
        (i32.add
         (get_local $2)
         (i32.and
          (get_local $11)
          (i32.const 255)
         )
        )
       )
      )
      (set_local $12
       (i32.add
        (get_local $12)
        (i32.const 1)
       )
      )
      (br_if $label$11
       (i32.lt_u
        (i32.and
         (tee_local $11
          (i32.add
           (get_local $11)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
        (i32.load8_u
         (get_local $3)
        )
       )
      )
     )
    )
    (set_local $7
     (i32.sub
      (get_local $4)
      (get_local $9)
     )
    )
    (block $label$12
     (br_if $label$12
      (i32.eqz
       (call $_Z5isVCFcPcPhh
        (get_local $0)
        (get_local $1)
        (i32.const 351456)
        (i32.and
         (get_local $12)
         (i32.const 255)
        )
       )
      )
     )
     (set_local $12
      (i32.load8_u
       (get_local $3)
      )
     )
     (i32.store8
      (get_local $3)
      (get_local $10)
     )
     (br_if $label$12
      (i32.le_u
       (tee_local $6
        (i32.and
         (i32.sub
          (get_local $12)
          (get_local $6)
         )
         (i32.const 255)
        )
       )
       (get_local $5)
      )
     )
     (set_local $12
      (i32.load8_u
       (i32.add
        (get_local $2)
        (get_local $5)
       )
      )
     )
     (i32.store8
      (get_local $3)
      (i32.add
       (get_local $10)
       (i32.const 1)
      )
     )
     (i32.store8
      (i32.add
       (get_local $2)
       (i32.and
        (get_local $10)
        (i32.const 255)
       )
      )
      (get_local $12)
     )
     (br_if $label$12
      (i32.le_u
       (get_local $6)
       (tee_local $11
        (i32.and
         (tee_local $12
          (i32.add
           (get_local $8)
           (i32.const 1)
          )
         )
         (i32.const 255)
        )
       )
      )
     )
     (loop $label$13
      (set_local $11
       (i32.load8_u
        (i32.add
         (get_local $2)
         (get_local $11)
        )
       )
      )
      (i32.store8
       (get_local $3)
       (i32.add
        (tee_local $9
         (i32.load8_u
          (get_local $3)
         )
        )
        (i32.const 1)
       )
      )
      (i32.store8
       (i32.add
        (get_local $2)
        (get_local $9)
       )
       (get_local $11)
      )
      (br_if $label$13
       (i32.gt_u
        (get_local $6)
        (tee_local $11
         (i32.and
          (tee_local $12
           (i32.add
            (get_local $12)
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
    (br_if $label$3
     (i32.and
      (get_local $7)
      (i32.const 255)
     )
    )
   )
  )
  (set_local $12
   (i32.const 0)
  )
  (set_local $7
   (i32.and
    (i32.add
     (i32.load8_u
      (get_local $3)
     )
     (i32.const -6)
    )
    (i32.const 255)
   )
  )
  (set_local $6
   (i32.add
    (get_local $0)
    (i32.const 128632400)
   )
  )
  (set_local $9
   (i32.const 0)
  )
  (loop $label$14
   (set_local $11
    (get_local $0)
   )
   (block $label$15
    (br_if $label$15
     (i32.eqz
      (i32.and
       (get_local $12)
       (i32.const 1)
      )
     )
    )
    (set_local $11
     (i32.load8_u
      (get_local $6)
     )
    )
   )
   (i32.store8
    (i32.add
     (get_local $1)
     (i32.load8_u
      (i32.add
       (get_local $2)
       (get_local $12)
      )
     )
    )
    (get_local $11)
   )
   (br_if $label$14
    (i32.le_u
     (tee_local $12
      (i32.and
       (tee_local $9
        (i32.add
         (get_local $9)
         (i32.const 1)
        )
       )
       (i32.const 255)
      )
     )
     (get_local $7)
    )
   )
  )
  (set_local $8
   (i32.add
    (get_local $2)
    (i32.const 1)
   )
  )
  (set_local $9
   (i32.add
    (tee_local $11
     (i32.load8_u
      (get_local $3)
     )
    )
    (i32.const 251)
   )
  )
  (loop $label$16
   (set_local $12
    (i32.const 0)
   )
   (block $label$17
    (br_if $label$17
     (i32.le_u
      (i32.and
       (get_local $11)
       (i32.const 255)
      )
      (tee_local $7
       (i32.and
        (tee_local $11
         (i32.add
          (get_local $9)
          (i32.const 2)
         )
        )
        (i32.const 255)
       )
      )
     )
    )
    (set_local $12
     (i32.const 0)
    )
    (loop $label$18
     (i32.store8
      (i32.add
       (i32.and
        (get_local $12)
        (i32.const 255)
       )
       (i32.const 351456)
      )
      (i32.load8_u
       (i32.add
        (get_local $2)
        (i32.and
         (get_local $11)
         (i32.const 255)
        )
       )
      )
     )
     (set_local $12
      (i32.add
       (get_local $12)
       (i32.const 1)
      )
     )
     (br_if $label$18
      (i32.lt_u
       (i32.and
        (tee_local $11
         (i32.add
          (get_local $11)
          (i32.const 1)
         )
        )
        (i32.const 255)
       )
       (i32.load8_u
        (get_local $3)
       )
      )
     )
    )
   )
   (set_local $6
    (i32.and
     (get_local $9)
     (i32.const 255)
    )
   )
   (block $label$19
    (br_if $label$19
     (i32.eqz
      (call $_Z5isVCFcPcPhh
       (get_local $0)
       (get_local $1)
       (i32.const 351456)
       (i32.and
        (get_local $12)
        (i32.const 255)
       )
      )
     )
    )
    (set_local $12
     (i32.load8_u
      (get_local $3)
     )
    )
    (i32.store8
     (get_local $3)
     (get_local $9)
    )
    (br_if $label$19
     (i32.le_u
      (tee_local $11
       (i32.and
        (i32.add
         (get_local $12)
         (i32.const -2)
        )
        (i32.const 255)
       )
      )
      (get_local $7)
     )
    )
    (set_local $12
     (i32.load8_u
      (i32.add
       (get_local $2)
       (get_local $7)
      )
     )
    )
    (i32.store8
     (get_local $3)
     (i32.add
      (get_local $9)
      (i32.const 1)
     )
    )
    (i32.store8
     (i32.add
      (get_local $2)
      (get_local $6)
     )
     (get_local $12)
    )
    (br_if $label$19
     (i32.eq
      (i32.add
       (get_local $7)
       (i32.const 1)
      )
      (get_local $11)
     )
    )
    (set_local $12
     (i32.add
      (get_local $8)
      (get_local $7)
     )
    )
    (set_local $11
     (i32.sub
      (i32.add
       (get_local $11)
       (i32.const -1)
      )
      (get_local $7)
     )
    )
    (loop $label$20
     (set_local $9
      (i32.load8_u
       (get_local $12)
      )
     )
     (i32.store8
      (get_local $3)
      (i32.add
       (tee_local $7
        (i32.load8_u
         (get_local $3)
        )
       )
       (i32.const 1)
      )
     )
     (i32.store8
      (i32.add
       (get_local $2)
       (get_local $7)
      )
      (get_local $9)
     )
     (set_local $12
      (i32.add
       (get_local $12)
       (i32.const 1)
      )
     )
     (br_if $label$20
      (tee_local $11
       (i32.add
        (get_local $11)
        (i32.const -1)
       )
      )
     )
    )
   )
   (block $label$21
    (br_if $label$21
     (i32.lt_u
      (get_local $6)
      (i32.const 2)
     )
    )
    (i32.store8
     (i32.add
      (get_local $1)
      (i32.load8_u
       (i32.add
        (i32.add
         (get_local $2)
         (get_local $6)
        )
        (i32.const -1)
       )
      )
     )
     (i32.const 0)
    )
    (i32.store8
     (i32.add
      (get_local $1)
      (i32.load8_u
       (i32.add
        (get_local $2)
        (tee_local $9
         (i32.add
          (get_local $6)
          (i32.const -2)
         )
        )
       )
      )
     )
     (i32.const 0)
    )
    (set_local $11
     (i32.load8_u
      (get_local $3)
     )
    )
    (br $label$16)
   )
  )
 )
 (func $_Z7findVCFPcchhj (; 51 ;) (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (param $4 i32)
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
  (local $26 i32)
  (local $27 i32)
  (local $28 i32)
  (set_local $15
   (i32.const 0)
  )
  (i32.store offset=128632372
   (i32.const 0)
   (i32.const 5880420)
  )
  (drop
   (call $memset
    (i32.const 351696)
    (i32.const 0)
    (i32.const 5880420)
   )
  )
  (loop $label$0
   (i32.store8
    (i32.add
     (get_local $15)
     (i32.const 218224)
    )
    (i32.load8_u
     (i32.add
      (get_local $0)
      (get_local $15)
     )
    )
   )
   (br_if $label$0
    (i32.ne
     (tee_local $15
      (i32.add
       (get_local $15)
       (i32.const 1)
      )
     )
     (i32.const 228)
    )
   )
  )
  (i32.store8 offset=219906
   (i32.const 0)
   (i32.const 225)
  )
  (i32.store16 offset=219904
   (i32.const 0)
   (i32.const 65535)
  )
  (set_local $5
   (i32.shl
    (get_local $4)
    (i32.const 1)
   )
  )
  (set_local $28
   (i32.const 112)
  )
  (set_local $15
   (i32.const 4)
  )
  (set_local $12
   (i32.add
    (get_local $1)
    (i32.const 128632400)
   )
  )
  (set_local $18
   (i32.const 0)
  )
  (set_local $22
   (i32.const 0)
  )
  (set_local $23
   (i32.const 0)
  )
  (set_local $24
   (i32.const 0)
  )
  (set_local $16
   (i32.const 0)
  )
  (set_local $25
   (i32.const 0)
  )
  (set_local $26
   (i32.const 0)
  )
  (set_local $27
   (i32.const 0)
  )
  (set_local $6
   (i32.const 3)
  )
  (set_local $13
   (i32.const 225)
  )
  (loop $label$1
   (i32.store8
    (i32.add
     (get_local $6)
     (i32.const 219904)
    )
    (get_local $13)
   )
   (block $label$2
    (block $label$3
     (loop $label$4
      (br_if $label$3
       (i32.and
        (get_local $26)
        (i32.const 1)
       )
      )
      (block $label$5
       (br_if $label$5
        (i32.and
         (get_local $16)
         (i32.const 65535)
        )
       )
       (call $_Z3logd
        (f64.convert_u/i32
         (get_local $16)
        )
       )
      )
      (set_local $13
       (i32.add
        (get_local $15)
        (i32.const -2)
       )
      )
      (block $label$6
       (block $label$7
        (block $label$8
         (block $label$9
          (block $label$10
           (block $label$11
            (block $label$12
             (block $label$13
              (block $label$14
               (br_if $label$14
                (i32.eq
                 (tee_local $6
                  (i32.load8_u
                   (i32.add
                    (get_local $15)
                    (i32.const 219902)
                   )
                  )
                 )
                 (i32.const 255)
                )
               )
               (br_if $label$13
                (i32.gt_u
                 (get_local $6)
                 (i32.const 224)
                )
               )
               (set_local $17
                (i32.load8_u
                 (i32.add
                  (get_local $15)
                  (i32.const 219903)
                 )
                )
               )
               (i32.store8
                (i32.add
                 (get_local $0)
                 (get_local $6)
                )
                (get_local $1)
               )
               (i32.store8
                (i32.add
                 (get_local $0)
                 (get_local $17)
                )
                (i32.load8_u
                 (get_local $12)
                )
               )
               (i32.store8
                (i32.add
                 (i32.and
                  (i32.add
                   (get_local $27)
                   (i32.const 1)
                  )
                  (i32.const 255)
                 )
                 (i32.const 218464)
                )
                (get_local $17)
               )
               (i32.store8
                (i32.add
                 (i32.and
                  (get_local $27)
                  (i32.const 255)
                 )
                 (i32.const 218464)
                )
                (get_local $6)
               )
               (i32.store8
                (i32.add
                 (get_local $13)
                 (i32.const 219904)
                )
                (i32.const 255)
               )
               (i32.store8
                (i32.add
                 (i32.add
                  (get_local $15)
                  (i32.const -1)
                 )
                 (i32.const 219904)
                )
                (i32.const 255)
               )
               (set_local $25
                (i32.add
                 (get_local $25)
                 (get_local $6)
                )
               )
               (set_local $27
                (i32.add
                 (get_local $27)
                 (i32.const 2)
                )
               )
               (br $label$12)
              )
              (set_local $6
               (i32.load8_u offset=128632384
                (i32.const 0)
               )
              )
              (call $_Z17vcfTransTablePushhjPhPc
               (tee_local $15
                (i32.and
                 (get_local $27)
                 (i32.const 255)
                )
               )
               (get_local $25)
               (i32.const 218464)
               (get_local $0)
              )
              (set_local $23
               (i32.add
                (get_local $23)
                (i32.ge_u
                 (get_local $15)
                 (get_local $6)
                )
               )
              )
              (set_local $22
               (i32.add
                (get_local $22)
                (i32.lt_u
                 (get_local $15)
                 (get_local $6)
                )
               )
              )
              (br_if $label$11
               (i32.eqz
                (get_local $15)
               )
              )
              (set_local $26
               (i32.const 0)
              )
              (i32.store8
               (i32.add
                (get_local $0)
                (i32.load8_u
                 (i32.add
                  (i32.and
                   (i32.add
                    (get_local $27)
                    (i32.const -1)
                   )
                   (i32.const 255)
                  )
                  (i32.const 218464)
                 )
                )
               )
               (i32.const 0)
              )
              (i32.store8
               (i32.add
                (get_local $0)
                (tee_local $15
                 (i32.load8_u
                  (i32.add
                   (i32.and
                    (tee_local $27
                     (i32.add
                      (get_local $27)
                      (i32.const -2)
                     )
                    )
                    (i32.const 255)
                   )
                   (i32.const 218464)
                  )
                 )
                )
               )
               (i32.const 0)
              )
              (set_local $25
               (i32.sub
                (get_local $25)
                (get_local $15)
               )
              )
              (set_local $15
               (get_local $13)
              )
              (br $label$6)
             )
             (set_local $15
              (get_local $13)
             )
             (set_local $6
              (get_local $28)
             )
            )
            (block $label$15
             (br_if $label$15
              (i32.eqz
               (call $_Z16vcfTransTableHashjPhPc
                (tee_local $13
                 (i32.and
                  (get_local $27)
                  (i32.const 255)
                 )
                )
                (get_local $25)
                (i32.const 218464)
                (get_local $0)
               )
              )
             )
             (set_local $24
              (i32.add
               (get_local $24)
               (i32.const 1)
              )
             )
             (set_local $26
              (i32.const 0)
             )
             (set_local $28
              (get_local $6)
             )
             (br $label$6)
            )
            (set_local $26
             (i32.const 0)
            )
            (block $label$16
             (br_if $label$16
              (i32.ge_u
               (get_local $13)
               (get_local $3)
              )
             )
             (call $_Z8testFourPccPt
              (get_local $0)
              (get_local $1)
              (i32.const 217760)
             )
             (br_if $label$10
              (i32.gt_u
               (tee_local $19
                (i32.and
                 (tee_local $17
                  (call $_Z8getLevelPcc
                   (get_local $0)
                   (i32.load8_s
                    (get_local $12)
                   )
                  )
                 )
                 (i32.const 255)
                )
               )
               (i32.const 8)
              )
             )
             (set_local $8
              (i32.or
               (i32.mul
                (i32.and
                 (tee_local $28
                  (select
                   (i32.shr_u
                    (get_local $17)
                    (i32.const 8)
                   )
                   (get_local $6)
                   (tee_local $17
                    (i32.eq
                     (get_local $19)
                     (i32.const 8)
                    )
                   )
                  )
                 )
                 (i32.const 255)
                )
                (i32.const 240)
               )
               (i32.const 15)
              )
             )
             (set_local $7
              (select
               (i32.const 1)
               (i32.const 225)
               (get_local $17)
              )
             )
             (br_if $label$9
              (i32.eqz
               (get_local $13)
              )
             )
             (set_local $10
              (i32.add
               (i32.and
                (i32.add
                 (get_local $27)
                 (i32.const -1)
                )
                (i32.const 255)
               )
               (i32.const 1)
              )
             )
             (set_local $6
              (i32.const 0)
             )
             (set_local $17
              (i32.const 0)
             )
             (set_local $19
              (i32.const 0)
             )
             (loop $label$17
              (block $label$18
               (br_if $label$18
                (i32.ne
                 (i32.and
                  (i32.load16_u
                   (i32.add
                    (i32.shl
                     (tee_local $6
                      (i32.load8_u
                       (i32.add
                        (i32.add
                         (get_local $6)
                         (get_local $8)
                        )
                        (i32.const 162336)
                       )
                      )
                     )
                     (i32.const 1)
                    )
                    (i32.const 217760)
                   )
                  )
                  (i32.const 30)
                 )
                 (i32.const 8)
                )
               )
               (i32.store8
                (tee_local $11
                 (i32.add
                  (get_local $0)
                  (get_local $6)
                 )
                )
                (get_local $1)
               )
               (set_local $9
                (call $_Z8getLevelPcc
                 (get_local $0)
                 (get_local $1)
                )
               )
               (i32.store8
                (get_local $11)
                (i32.const 0)
               )
               (block $label$19
                (br_if $label$19
                 (i32.ne
                  (i32.and
                   (get_local $9)
                   (i32.const 255)
                  )
                  (i32.const 9)
                 )
                )
                (call $_Z17vcfTransTablePushhjPhPc
                 (get_local $13)
                 (get_local $25)
                 (i32.const 218464)
                 (get_local $0)
                )
                (set_local $9
                 (call $memcpy
                  (i32.const 285440)
                  (i32.const 218464)
                  (get_local $10)
                 )
                )
                (i32.store8
                 (i32.add
                  (get_local $13)
                  (i32.const 285441)
                 )
                 (i32.const 255)
                )
                (i32.store8
                 (i32.add
                  (get_local $13)
                  (get_local $9)
                 )
                 (get_local $6)
                )
                (call $_Z3logd
                 (f64.const 88888)
                )
                (call $_Z3logPhj
                 (i32.const 218464)
                 (get_local $13)
                )
                (call $_Z3logPhj
                 (i32.const 219904)
                 (get_local $15)
                )
                (call $_Z3logd
                 (f64.const -88888)
                )
                (br_if $label$18
                 (i32.ne
                  (tee_local $18
                   (i32.add
                    (get_local $18)
                    (i32.const 1)
                   )
                  )
                  (get_local $2)
                 )
                )
                (br $label$7)
               )
               (i32.store8
                (i32.add
                 (i32.and
                  (get_local $19)
                  (i32.const 255)
                 )
                 (i32.const 219664)
                )
                (i32.shr_u
                 (get_local $9)
                 (i32.const 8)
                )
               )
               (i32.store8
                (i32.add
                 (i32.and
                  (i32.add
                   (get_local $19)
                   (i32.const 1)
                  )
                  (i32.const 255)
                 )
                 (i32.const 219664)
                )
                (get_local $6)
               )
               (set_local $19
                (i32.add
                 (get_local $19)
                 (i32.const 2)
                )
               )
              )
              (br_if $label$17
               (i32.gt_u
                (get_local $7)
                (tee_local $6
                 (i32.and
                  (tee_local $17
                   (i32.add
                    (get_local $17)
                    (i32.const 1)
                   )
                  )
                  (i32.const 255)
                 )
                )
               )
              )
              (br $label$8)
             )
            )
            (set_local $28
             (get_local $6)
            )
            (br $label$6)
           )
           (set_local $26
            (i32.const 1)
           )
           (set_local $15
            (get_local $13)
           )
           (set_local $27
            (i32.const 0)
           )
           (br $label$6)
          )
          (set_local $28
           (get_local $6)
          )
          (br $label$6)
         )
         (set_local $6
          (i32.const 0)
         )
         (set_local $17
          (i32.const 0)
         )
         (set_local $19
          (i32.const 0)
         )
         (loop $label$20
          (block $label$21
           (br_if $label$21
            (i32.ne
             (i32.and
              (i32.load16_u
               (i32.add
                (i32.shl
                 (tee_local $6
                  (i32.load8_u
                   (i32.add
                    (i32.add
                     (get_local $6)
                     (get_local $8)
                    )
                    (i32.const 162336)
                   )
                  )
                 )
                 (i32.const 1)
                )
                (i32.const 217760)
               )
              )
              (i32.const 30)
             )
             (i32.const 8)
            )
           )
           (i32.store8
            (tee_local $11
             (i32.add
              (get_local $0)
              (get_local $6)
             )
            )
            (get_local $1)
           )
           (set_local $9
            (call $_Z8getLevelPcc
             (get_local $0)
             (get_local $1)
            )
           )
           (i32.store8
            (get_local $11)
            (i32.const 0)
           )
           (block $label$22
            (br_if $label$22
             (i32.ne
              (i32.and
               (get_local $9)
               (i32.const 255)
              )
              (i32.const 9)
             )
            )
            (call $_Z17vcfTransTablePushhjPhPc
             (i32.const 0)
             (get_local $25)
             (i32.const 218464)
             (get_local $0)
            )
            (i32.store8
             (i32.add
              (get_local $13)
              (i32.const 285441)
             )
             (i32.const 255)
            )
            (i32.store8
             (i32.add
              (get_local $13)
              (i32.const 285440)
             )
             (get_local $6)
            )
            (call $_Z3logd
             (f64.const 88888)
            )
            (call $_Z3logPhj
             (i32.const 218464)
             (get_local $13)
            )
            (call $_Z3logPhj
             (i32.const 219904)
             (get_local $15)
            )
            (call $_Z3logd
             (f64.const -88888)
            )
            (br_if $label$21
             (i32.ne
              (tee_local $18
               (i32.add
                (get_local $18)
                (i32.const 1)
               )
              )
              (get_local $2)
             )
            )
            (br $label$7)
           )
           (i32.store8
            (i32.add
             (i32.and
              (get_local $19)
              (i32.const 255)
             )
             (i32.const 219664)
            )
            (i32.shr_u
             (get_local $9)
             (i32.const 8)
            )
           )
           (i32.store8
            (i32.add
             (i32.and
              (i32.add
               (get_local $19)
               (i32.const 1)
              )
              (i32.const 255)
             )
             (i32.const 219664)
            )
            (get_local $6)
           )
           (set_local $19
            (i32.add
             (get_local $19)
             (i32.const 2)
            )
           )
          )
          (br_if $label$20
           (i32.gt_u
            (get_local $7)
            (tee_local $6
             (i32.and
              (tee_local $17
               (i32.add
                (get_local $17)
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
        (br_if $label$6
         (tee_local $14
          (i32.lt_u
           (tee_local $19
            (i32.and
             (get_local $19)
             (i32.const 255)
            )
           )
           (i32.const 2)
          )
         )
        )
        (set_local $6
         (i32.const 1)
        )
        (loop $label$23
         (i32.store8
          (i32.add
           (get_local $0)
           (i32.load8_u
            (i32.add
             (get_local $6)
             (i32.const 219664)
            )
           )
          )
          (get_local $1)
         )
         (br_if $label$23
          (i32.lt_u
           (tee_local $6
            (i32.and
             (i32.add
              (get_local $6)
              (i32.const 2)
             )
             (i32.const 255)
            )
           )
           (get_local $19)
          )
         )
        )
        (br_if $label$6
         (get_local $14)
        )
        (set_local $8
         (i32.const 0)
        )
        (set_local $13
         (i32.const 1)
        )
        (set_local $7
         (i32.const 0)
        )
        (set_local $20
         (i32.const 0)
        )
        (set_local $26
         (i32.const 0)
        )
        (loop $label$24
         (set_local $11
          (get_local $26)
         )
         (set_local $9
          (get_local $20)
         )
         (set_local $10
          (get_local $7)
         )
         (set_local $17
          (get_local $8)
         )
         (set_local $7
          (call $_Z8testLinehhcPc
           (tee_local $6
            (i32.load8_u
             (i32.add
              (get_local $13)
              (i32.const 219664)
             )
            )
           )
           (i32.const 0)
           (get_local $1)
           (get_local $0)
          )
         )
         (set_local $8
          (call $_Z8testLinehhcPc
           (get_local $6)
           (i32.const 1)
           (get_local $1)
           (get_local $0)
          )
         )
         (set_local $26
          (call $_Z8testLinehhcPc
           (get_local $6)
           (i32.const 2)
           (get_local $1)
           (get_local $0)
          )
         )
         (block $label$25
          (block $label$26
           (br_if $label$26
            (i32.gt_u
             (tee_local $26
              (i32.and
               (select
                (select
                 (tee_local $20
                  (call $_Z8testLinehhcPc
                   (get_local $6)
                   (i32.const 3)
                   (get_local $1)
                   (get_local $0)
                  )
                 )
                 (tee_local $26
                  (select
                   (select
                    (tee_local $26
                     (i32.and
                      (get_local $26)
                      (i32.const 15)
                     )
                    )
                    (tee_local $8
                     (select
                      (select
                       (tee_local $8
                        (i32.and
                         (get_local $8)
                         (i32.const 15)
                        )
                       )
                       (tee_local $7
                        (select
                         (tee_local $7
                          (i32.and
                           (get_local $7)
                           (i32.const 15)
                          )
                         )
                         (i32.const 0)
                         (i32.lt_u
                          (i32.and
                           (i32.add
                            (get_local $7)
                            (i32.const -1)
                           )
                           (i32.const 65535)
                          )
                          (i32.const 9)
                         )
                        )
                       )
                       (i32.gt_u
                        (get_local $8)
                        (get_local $7)
                       )
                      )
                      (get_local $7)
                      (i32.lt_u
                       (get_local $8)
                       (i32.const 10)
                      )
                     )
                    )
                    (i32.gt_u
                     (get_local $26)
                     (get_local $8)
                    )
                   )
                   (get_local $8)
                   (i32.lt_u
                    (get_local $26)
                    (i32.const 10)
                   )
                  )
                 )
                 (i32.gt_u
                  (tee_local $8
                   (i32.and
                    (get_local $20)
                    (i32.const 15)
                   )
                  )
                  (i32.and
                   (get_local $26)
                   (i32.const 65535)
                  )
                 )
                )
                (get_local $26)
                (i32.lt_u
                 (get_local $8)
                 (i32.const 10)
                )
               )
               (i32.const 15)
              )
             )
             (i32.const 9)
            )
           )
           (block $label$27
            (block $label$28
             (br_if $label$28
              (i32.and
               (tee_local $8
                (i32.shl
                 (i32.const 1)
                 (get_local $26)
                )
               )
               (i32.const 832)
              )
             )
             (br_if $label$27
              (i32.eqz
               (i32.and
                (get_local $8)
                (i32.const 48)
               )
              )
             )
             (set_local $21
              (i32.const 218704)
             )
             (i32.store8
              (i32.add
               (i32.and
                (get_local $11)
                (i32.const 255)
               )
               (i32.const 218704)
              )
              (i32.load8_u
               (i32.add
                (get_local $13)
                (i32.const 219663)
               )
              )
             )
             (set_local $26
              (i32.add
               (get_local $11)
               (i32.const 2)
              )
             )
             (set_local $20
              (get_local $9)
             )
             (set_local $7
              (get_local $10)
             )
             (set_local $8
              (get_local $17)
             )
             (set_local $17
              (get_local $11)
             )
             (br $label$25)
            )
            (set_local $21
             (i32.const 218944)
            )
            (i32.store8
             (i32.add
              (i32.and
               (get_local $9)
               (i32.const 255)
              )
              (i32.const 218944)
             )
             (get_local $6)
            )
            (set_local $20
             (i32.add
              (get_local $9)
              (i32.const 2)
             )
            )
            (set_local $6
             (i32.load8_u
              (i32.add
               (get_local $13)
               (i32.const 219663)
              )
             )
            )
            (set_local $26
             (get_local $11)
            )
            (set_local $7
             (get_local $10)
            )
            (set_local $8
             (get_local $17)
            )
            (set_local $17
             (get_local $9)
            )
            (br $label$25)
           )
           (br_if $label$26
            (i32.ne
             (get_local $26)
             (i32.const 7)
            )
           )
           (set_local $21
            (i32.const 219184)
           )
           (i32.store8
            (i32.add
             (i32.and
              (get_local $10)
              (i32.const 255)
             )
             (i32.const 219184)
            )
            (i32.load8_u
             (i32.add
              (get_local $13)
              (i32.const 219663)
             )
            )
           )
           (set_local $7
            (i32.add
             (get_local $10)
             (i32.const 2)
            )
           )
           (set_local $26
            (get_local $11)
           )
           (set_local $20
            (get_local $9)
           )
           (set_local $8
            (get_local $17)
           )
           (set_local $17
            (get_local $10)
           )
           (br $label$25)
          )
          (set_local $21
           (i32.const 219424)
          )
          (i32.store8
           (i32.add
            (i32.and
             (get_local $17)
             (i32.const 255)
            )
            (i32.const 219424)
           )
           (i32.load8_u
            (i32.add
             (get_local $13)
             (i32.const 219663)
            )
           )
          )
          (set_local $8
           (i32.add
            (get_local $17)
            (i32.const 2)
           )
          )
          (set_local $26
           (get_local $11)
          )
          (set_local $20
           (get_local $9)
          )
          (set_local $7
           (get_local $10)
          )
         )
         (i32.store8
          (i32.add
           (get_local $21)
           (i32.and
            (i32.add
             (get_local $17)
             (i32.const 1)
            )
            (i32.const 255)
           )
          )
          (get_local $6)
         )
         (br_if $label$24
          (i32.lt_u
           (tee_local $13
            (i32.and
             (i32.add
              (get_local $13)
              (i32.const 2)
             )
             (i32.const 255)
            )
           )
           (get_local $19)
          )
         )
        )
        (block $label$29
         (br_if $label$29
          (i32.eqz
           (tee_local $17
            (i32.and
             (get_local $8)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $6
          (i32.add
           (get_local $15)
           (i32.const 219904)
          )
         )
         (set_local $9
          (i32.and
           (i32.add
            (get_local $8)
            (i32.const -1)
           )
           (i32.const 255)
          )
         )
         (set_local $13
          (i32.const 0)
         )
         (loop $label$30
          (i32.store8
           (get_local $6)
           (i32.load8_u
            (i32.add
             (i32.and
              (tee_local $8
               (i32.add
                (get_local $8)
                (i32.const -1)
               )
              )
              (i32.const 255)
             )
             (i32.const 219424)
            )
           )
          )
          (set_local $6
           (i32.add
            (get_local $6)
            (i32.const 1)
           )
          )
          (br_if $label$30
           (i32.lt_u
            (i32.and
             (tee_local $13
              (i32.add
               (get_local $13)
               (i32.const 1)
              )
             )
             (i32.const 255)
            )
            (get_local $17)
           )
          )
         )
         (set_local $15
          (i32.add
           (i32.add
            (get_local $15)
            (get_local $9)
           )
           (i32.const 1)
          )
         )
        )
        (block $label$31
         (br_if $label$31
          (i32.eqz
           (tee_local $17
            (i32.and
             (get_local $26)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $6
          (i32.add
           (get_local $15)
           (i32.const 219904)
          )
         )
         (set_local $8
          (i32.and
           (i32.add
            (get_local $26)
            (i32.const -1)
           )
           (i32.const 255)
          )
         )
         (set_local $13
          (i32.const 0)
         )
         (loop $label$32
          (i32.store8
           (get_local $6)
           (i32.load8_u
            (i32.add
             (i32.and
              (tee_local $26
               (i32.add
                (get_local $26)
                (i32.const -1)
               )
              )
              (i32.const 255)
             )
             (i32.const 218704)
            )
           )
          )
          (set_local $6
           (i32.add
            (get_local $6)
            (i32.const 1)
           )
          )
          (br_if $label$32
           (i32.lt_u
            (i32.and
             (tee_local $13
              (i32.add
               (get_local $13)
               (i32.const 1)
              )
             )
             (i32.const 255)
            )
            (get_local $17)
           )
          )
         )
         (set_local $15
          (i32.add
           (i32.add
            (get_local $15)
            (get_local $8)
           )
           (i32.const 1)
          )
         )
        )
        (block $label$33
         (br_if $label$33
          (i32.eqz
           (i32.and
            (get_local $20)
            (i32.const 255)
           )
          )
         )
         (drop
          (call $memcpy
           (i32.add
            (get_local $15)
            (i32.const 219904)
           )
           (i32.const 218944)
           (i32.add
            (tee_local $6
             (i32.and
              (i32.add
               (get_local $20)
               (i32.const -1)
              )
              (i32.const 255)
             )
            )
            (i32.const 1)
           )
          )
         )
         (set_local $15
          (i32.add
           (i32.add
            (get_local $15)
            (get_local $6)
           )
           (i32.const 1)
          )
         )
        )
        (block $label$34
         (br_if $label$34
          (i32.eqz
           (tee_local $17
            (i32.and
             (get_local $7)
             (i32.const 255)
            )
           )
          )
         )
         (set_local $6
          (i32.add
           (get_local $15)
           (i32.const 219904)
          )
         )
         (set_local $26
          (i32.and
           (i32.add
            (get_local $7)
            (i32.const -1)
           )
           (i32.const 255)
          )
         )
         (set_local $13
          (i32.const 0)
         )
         (loop $label$35
          (i32.store8
           (get_local $6)
           (i32.load8_u
            (i32.add
             (i32.and
              (tee_local $7
               (i32.add
                (get_local $7)
                (i32.const -1)
               )
              )
              (i32.const 255)
             )
             (i32.const 219184)
            )
           )
          )
          (set_local $6
           (i32.add
            (get_local $6)
            (i32.const 1)
           )
          )
          (br_if $label$35
           (i32.lt_u
            (i32.and
             (tee_local $13
              (i32.add
               (get_local $13)
               (i32.const 1)
              )
             )
             (i32.const 255)
            )
            (get_local $17)
           )
          )
         )
         (set_local $15
          (i32.add
           (i32.add
            (get_local $15)
            (get_local $26)
           )
           (i32.const 1)
          )
         )
        )
        (set_local $26
         (i32.const 0)
        )
        (br_if $label$6
         (get_local $14)
        )
        (set_local $6
         (i32.const 1)
        )
        (loop $label$36
         (set_local $26
          (i32.const 0)
         )
         (i32.store8
          (i32.add
           (get_local $0)
           (i32.load8_u
            (i32.add
             (get_local $6)
             (i32.const 219664)
            )
           )
          )
          (i32.const 0)
         )
         (br_if $label$36
          (i32.lt_u
           (tee_local $6
            (i32.and
             (i32.add
              (get_local $6)
              (i32.const 2)
             )
             (i32.const 255)
            )
           )
           (get_local $19)
          )
         )
         (br $label$6)
        )
       )
       (drop
        (call $memset
         (i32.add
          (get_local $15)
          (i32.const 219904)
         )
         (i32.const 255)
         (i32.add
          (get_local $13)
          (i32.const 1)
         )
        )
       )
       (i32.store8
        (i32.add
         (tee_local $15
          (i32.add
           (get_local $15)
           (get_local $13)
          )
         )
         (i32.const 219905)
        )
        (i32.const 255)
       )
       (set_local $15
        (i32.add
         (get_local $15)
         (i32.const 2)
        )
       )
       (set_local $18
        (get_local $2)
       )
      )
      (br_if $label$4
       (i32.lt_u
        (tee_local $16
         (i32.add
          (get_local $16)
          (i32.const 1)
         )
        )
        (get_local $5)
       )
      )
      (br $label$2)
     )
    )
    (call $_Z3logd
     (f64.const 99999)
    )
    (call $_Z3logd
     (f64.convert_u/i32
      (get_local $22)
     )
    )
    (call $_Z3logd
     (f64.convert_u/i32
      (get_local $23)
     )
    )
    (call $_Z3logd
     (f64.convert_u/i32
      (get_local $24)
     )
    )
    (call $_Z3logd
     (f64.convert_u/i32
      (get_local $4)
     )
    )
    (call $_Z3logd
     (f64.const -99999)
    )
    (return)
   )
   (set_local $13
    (i32.const 255)
   )
   (i32.store8
    (i32.add
     (get_local $15)
     (i32.const 219904)
    )
    (i32.const 255)
   )
   (set_local $6
    (i32.add
     (get_local $15)
     (i32.const 1)
    )
   )
   (set_local $15
    (i32.add
     (get_local $15)
     (i32.const 2)
    )
   )
   (br $label$1)
  )
 )
)
