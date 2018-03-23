package com.jtao.cloud.utils

fun ByteArray.toHexString(): String {
    var s = ""
    this.forEach {
        var t = ((it.toInt() + 256)% 256).toString(16)
        kotlin.repeat(2-t.length, {
            t = "0${t}"
        })
        s = "$s$t"
    }
    return s
}

private fun Char.toHex() = "0123456789abcdef".indexOf(this)

fun String.toHexByteArray(): ByteArray {
    val s = when(this.length%2) {
        0->this
        else -> "0$this"
    }
    val chars = s.toLowerCase().toCharArray()
    val length = chars.size/2
    val b = ByteArray(length)
    b.forEachIndexed { index, _ ->
        b[index] = ((chars[index*2].toHex() shl 4) or (chars[index*2+1].toHex())).toByte()
    }
    return b
}

fun main(args:Array<String>){
    println(byteArrayOf(1,2,3,4,0xfe.toByte(),0).toHexString())
    println("f1023".toHexByteArray().toHexString())
}