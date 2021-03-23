package com.ftq;

import com.ftq.service.UserSer;
import org.junit.Test;

import javax.annotation.Resource;

public class test {


   @Test
   public void test1() {
       int be = cal(35,5);
       int af = cal(12,2);
       System.out.println(be*af);
   }

    public int cal(int a,int b){
       int sum1 = 1;
       int sum2 = 1;
       for (int i = 0;i < b;i++){
           sum1 = a * sum1;
           a--;
       }
        for (int i = 1;i <= b;i++){
            sum2 = i * sum2;
        }
       return sum1 / sum2;
    }
}
